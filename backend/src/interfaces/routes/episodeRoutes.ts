import { Router } from 'express';
import { EpisodeController } from '../controllers/EpisodeController';

const router = Router();
const controller = new EpisodeController();

router.patch('/:id/watched', controller.updateWatched);
router.post('/comments', controller.addComment);

export default router;