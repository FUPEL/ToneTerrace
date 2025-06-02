import Track from "../models/Track.js";

export const store = async (req, res) => {
    try {
        const track = new Track(req.body);
        const saved = await track.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const index = async (req, res) => {
    const tracks = await Track.find();
    res.json(tracks);
}

export const show = async (req, res) => {
    const track = await Track.findById(req.params.id).populate('playlist')
    res.json({
        id: track.id,
        title: track.title,
        artist: track.artist,
        uri: track.uri,
        duration: track.duration,
        playlist: {
            id: track.playlist._id,
            title: track.playlist.title,
            artist: track.playlist.artist,
            album_art: track.playlist.album_art,
            album_background: track.playlist.album_background,
            duration_total: track.playlist.duration_total,
        }
    })
}