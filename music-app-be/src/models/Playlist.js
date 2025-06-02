import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    type: { type: String },
    album_art: { type: String },
    album_background: { type: String },
    duration_total: { type: Number, default: 0 },
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
