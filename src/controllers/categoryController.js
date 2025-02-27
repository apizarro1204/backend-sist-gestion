import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};
