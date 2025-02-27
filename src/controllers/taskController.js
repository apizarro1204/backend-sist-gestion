import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Obtener todas las tareas del usuario autenticado
export const obtenerTareas = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    // Obtener todas las tareas del usuario autenticado
    const tareas = await prisma.tarea.findMany({
      where: {
        usuarioId: usuarioId,
      },
    });

    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva tarea y asignarla a un usuario
export const crearTarea = async (req, res) => {
  const { titulo, descripcion, fechaLimite, estado, prioridad, categoriaId } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];
  const usuarioId = req.usuario.id;

  console.log('Datos recibidos:', { titulo, descripcion, fechaLimite, estado, prioridad, categoriaId, token });

  if (!titulo || !descripcion || !fechaLimite || !estado || !prioridad || !categoriaId) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  try {
    // Verificar si la categoría existe
    const categoria = await prisma.categoria.findUnique({
      where: { id: categoriaId }
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Crear la nueva tarea y asignarla al usuario
    const nuevaTarea = await prisma.tarea.create({
      data: {
        titulo,
        descripcion,
        fechaLimite: new Date(fechaLimite),
        estado,
        prioridad,
        categoriaId,
        usuarioId,
      },
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar una tarea (también podemos actualizar la categoría si es necesario)
export const editarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fechaLimite, estado, prioridad, categoriaId } = req.body;

  if (!titulo && !descripcion && !fechaLimite && !estado && !prioridad && !categoriaId) {
    return res.status(400).json({ error: "Debe proporcionar al menos un campo para actualizar" });
  }

  try {
    const tareaExistente = await prisma.tarea.findUnique({
      where: { id: Number(id) },
    });

    if (!tareaExistente) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (categoriaId) {
      const categoria = await prisma.categoria.findUnique({
        where: { id: categoriaId },
      });

      if (!categoria) {
        return res.status(404).json({ error: "Categoría no encontrada" });
      }
    }

    const tareaActualizada = await prisma.tarea.update({
      where: { id: Number(id) },
      data: {
        ...(titulo && { titulo }),
        ...(descripcion && { descripcion }),
        ...(fechaLimite && { fechaLimite }),
        ...(estado && { estado }),
        ...(prioridad && { prioridad }),
        ...(categoriaId && { categoriaId }),
      },
    });

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una tarea del usuario autenticado
export const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  try {
    const tareaExistente = await prisma.tarea.findUnique({
      where: { id: Number(id) },
    });

    if (!tareaExistente) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    if (tareaExistente.usuarioId !== usuarioId) {
      return res.status(403).json({ error: "No tienes permiso para eliminar esta tarea" });
    }

    await prisma.tarea.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
