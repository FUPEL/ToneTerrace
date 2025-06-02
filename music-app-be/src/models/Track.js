import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  uri: { type: String, required: true },
  year: { type: Number },
  duration: { type: Number, required: true }
});

const Track = mongoose.model('Track', trackSchema);
export default Track;
