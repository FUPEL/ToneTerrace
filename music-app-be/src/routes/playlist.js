import express from 'express';
import * as PlaylistController from '../controllers/playlist.js'
import { optional } from '../middlewares/optional.js';
import { upload } from '../middlewares/upload.js';
import { imageUpload } from '../middlewares/image.js';

const router = express.Router();

router.post('/:id/track', upload.single('audio'), PlaylistController.addTrack);
router.post('/sync-duration', PlaylistController.syncPlaylistDurations);
router.post('/', imageUpload.fields([
    { name: 'album_art', maxCount: 1 },
    { name: 'album_background', maxCount: 1 }
]), PlaylistController.store);
router.get('/', optional, PlaylistController.index);
router.get('/:id', optional, PlaylistController.show);

export default router;
