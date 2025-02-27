import express from 'express';
import { obtenerCategorias } from '../controllers/categoryController.js';
const router = express.Router();

router.get('/', obtenerCategorias);

export default router;
