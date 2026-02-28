import { Router } from 'express';
import { ShowController } from '../controllers/ShowController';

const router = Router();
const controller = new ShowController();

router.get('/', controller.search);
router.get('/:id', controller.getDetails);
router.get('/:id/comments', controller.getComments);

export default router;