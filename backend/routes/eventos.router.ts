import { Router } from 'express';
import eventoController from '../controllers/evento';

const router = Router();

router.post('/', eventoController.index);

export default router;