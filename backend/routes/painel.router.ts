import { Router } from 'express';
import painelController from '../controllers/painel';

const router = Router();

router.get('/:id', painelController.index);

export default router;