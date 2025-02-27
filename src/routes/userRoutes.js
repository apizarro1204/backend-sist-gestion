import express from 'express';
import { crearUsuario, loginUsuario } from '../controllers/userController.js';

const router = express.Router();

router.post('/registrar', crearUsuario);
router.post('/login', loginUsuario);

export default router;
