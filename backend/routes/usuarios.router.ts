import { Router } from 'express';
import usuarioController from '../controllers/usuario';

const router = Router();

router.post('/', usuarioController.cadastro);

export default router;
