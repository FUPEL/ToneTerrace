import Playlist from "../models/Playlist.js";
import Track from "../models/Track.js";
import ffmpeg from 'fluent-ffmpeg';
import ffprobeStatic from 'ffprobe-static';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfprobePath(ffprobeStatic.path);

export const store = async (req, res) => {
    try {
        const playlistData = {
            ...req.body,
            album_art: req.files['album_art']?.[0]?.filename || null,
            album_background: req.files['album_background']?.[0]?.filename || null
        }

        const playlist = new Playlist(playlistData);
        const saved = await playlist.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const addTrack = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Audio file is required' });
        }

        const audioPath = path.join(__dirname, '../../', req.file.path);

        ffmpeg.ffprobe(audioPath, async (err, metadata) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get audio metadata' });
            }

            const durationInSeconds = metadata.format.duration;

            const track = new Track({
                title: req.body.title,
                artist: req.body.artist,
                year: req.body.year,
                uri: req.file.filename,
                duration: durationInSeconds,
                playlist: req.params.id
            });

            const savedTrack = await track.save();

            playlist.tracks.push(savedTrack._id);
            playlist.duration_total += durationInSeconds; // ⬅️ Update total durasi

            const updatedPlaylist = await playlist.save();

            res.status(201).json({
                message: 'Track added to playlist',
                playlist: updatedPlaylist,
                track: savedTrack
            });
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const index = async (req, res) => {
    let playlists
    if (req.query.q) {
        playlists = await Playlist.aggregate([
            {
                $lookup: {
                    from: 'tracks',
                    localField: 'tracks',
                    foreignField: '_id',
                    as: 'trackDetails',
                },
            },
            {
                $match: {
                    $or: [
                        { title: { $regex: req.query.q, $options: 'i' } },
                        { 'trackDetails.title': { $regex: req.query.q, $options: 'i' } },
                        { 'trackDetails.title': { $regex: req.query.q, $options: 'i' } },
                        { 'trackDetails.artist': { $regex: req.query.q, $options: 'i' } }
                    ],
                },
            },
            {
                $project: {
                    trackDetails: 0 // jangan tampilkan track detail, hanya playlist
                },
            },
        ])
    } else {
        playlists = await Playlist.find();
    }
    res.json(
        playlists.map((playlist) => ({
            id: playlist._id,
            title: playlist.title,
            artist: playlist.artist,
            type: playlist.type,
            album_art: playlist.album_art,
            album_background: playlist.album_background,
            duration_total: playlist.duration_total
        }))
    );
}

export const show = async (req, res) => {
    const playlist = await Playlist.findById(req.params.id).populate('tracks');
    res.json({
        id: playlist._id,
        title: playlist.title,
        artist: playlist.artist,
        type: playlist.type,
        album_art: playlist.album_art,
        album_background: playlist.album_background,
        duration_total: playlist.duration_total,
        tracks: playlist.tracks.map((map) => ({
            id: map._id,
            title: map.title,
            artist: map.artist,
            uri: map.uri,
            duration: map.duration
        }))
    });
}

export const syncPlaylistDurations = async (req, res) => {
    try {
        const playlists = await Playlist.find();

        for (const playlist of playlists) {
            const tracks = await Track.find({ playlist: playlist._id });

            const totalDuration = tracks.reduce((acc, track) => acc + track.duration, 0);
            playlist.duration_total = totalDuration;
            await playlist.save();
        }

        res.status(200).json({ message: 'Playlist durations synced successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};