import { Router } from 'express';
import loginController from '../controllers/login';

const router = Router();

router.post('/', loginController.index);

export default router;