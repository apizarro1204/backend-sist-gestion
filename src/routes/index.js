import express from 'express';
import tareasRoutes from './taskRoutes.js'
import usuarioRoutes from './userRoutes.js'
import categoriasRoutes from './categoryRoutes.js';

const router = express.Router();

// Rutas principales
router.use('/tareas', tareasRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/categorias', categoriasRoutes);

export default router;
