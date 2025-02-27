import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { enviarNotificacion } from '../utils/notificaciones.js';

const prisma = new PrismaClient();

// Verificar tareas próximas a vencer cada 30 minutos
cron.schedule('*/30 * * * *', async () => {
  try {
    // Obtener tareas que vencen en las próximas 24 horas
    const tareasProximasAVencer = await prisma.tarea.findMany({
      where: {
        fechaLimite: {
          lte: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        },
        estado: 'Pendiente',
      },
    });

    // Enviar notificación a los usuarios de estas tareas
    tareasProximasAVencer.forEach(async (tarea) => {
      // Suponiendo que tenemos un campo `usuarioId` en la tarea para saber a qué usuario pertenece
      const usuario = await prisma.usuario.findUnique({
        where: { id: tarea.usuarioId },
      });

      if (usuario) {
        enviarNotificacion(usuario, tarea);
      }
    });
  } catch (error) {
    console.error('Error al verificar tareas próximas a vencer:', error);
  }
});
