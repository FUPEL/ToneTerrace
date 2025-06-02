import express from 'express';
import * as TrackController from '../controllers/track.js'

const router = express.Router();

router.post('/', TrackController.store);
router.get('/', TrackController.index);
router.get('/:id', TrackController.show);

export default router;
