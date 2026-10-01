import { fetchConToken } from '../api';

/**
 * Envía una orden/evento a RabbitMQ a través del Backend/Gateway.
 * Usa MSAL para incluir el token Bearer en los Headers.
 */
export const enviarOrdenRabbit = async (instance, account, orderData) => {
  try {
    const payload = {
      orderId: `ORD-${Date.now()}`,
      customerName: account?.name || account?.username || 'Usuario Otaku',
      // Convertimos a JSON string solo si se recibe como Objeto JavaScript
      detalles: typeof orderData === 'object' ? JSON.stringify(orderData) : orderData,
    };

    // Apunta al endpoint expuesto por tu Spring Boot Gateway
    const response = await fetchConToken('/api/orders/send', instance, account, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.error('Error al enviar la orden a RabbitMQ:', error);
    throw error;
  }
};

/**
 * Consulta el estado del servicio de RabbitMQ/Backend
 */
export const obtenerEstadoOrdenes = async (instance, account) => {
  try {
    return await fetchConToken('/api/orders/status', instance, account, {
      method: 'GET',
    });
  } catch (error) {
    console.error('Error consultando el estado de órdenes:', error);
    throw error;
  }
};