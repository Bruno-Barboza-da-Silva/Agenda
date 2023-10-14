import { Router } from 'express';
import logoutController from '../controllers/logout';

const router = Router();

router.get('/', logoutController.index);

export default router;