import express from 'express';
import { obtenerTareas, crearTarea, editarTarea, eliminarTarea } from '../controllers/taskController.js';
import verificarToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerTareas);
router.post('/', verificarToken, crearTarea);
router.put('/:id', verificarToken, editarTarea);
router.delete('/:id', verificarToken, eliminarTarea);

export default router;
