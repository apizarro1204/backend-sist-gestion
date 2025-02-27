import axios from 'axios';

const EXPO_PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

// Función para enviar una notificación
export const enviarNotificacion = async (usuario, tarea) => {
  try {
    const mensaje = {
      to: usuario.expoPushToken,
      sound: 'default',
      title: `Tarea próxima a vencer: ${tarea.titulo}`,
      body: `La tarea "${tarea.titulo}" vence en menos de 24 horas.`,
      data: { tareaId: tarea.id },
    };

    // Enviar la notificación utilizando el endpoint de Expo
    const response = await axios.post(EXPO_PUSH_ENDPOINT, mensaje, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Notificación enviada exitosamente');
    } else {
      console.error('Error al enviar notificación', response.data);
    }
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};
