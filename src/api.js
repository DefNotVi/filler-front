import { loginRequest } from "./AuthConfig";

// Limpiamos la URL quitando cualquier barra final sobrante
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://d5s26lhjse.execute-api.us-east-1.amazonaws.com").replace(/\/$/, "");

export const fetchConToken = async (endpoint, instance, account, options = {}) => {
  try {
    if (!account) {
      throw new Error("No hay una cuenta activa seleccionada.");
    }

    // 1. Obtiene el token de forma silenciosa desde Azure
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account
    });

    const token = response.accessToken;

    // 2. Nos aseguramos de que el endpoint comience con una sola barra '/'
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    // 3. Peticion final combinada sin barras dobles
    const res = await fetch(`${BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (res.status === 401 || res.status === 403) {
      throw new Error("No autorizado o sesión expirada");
    }

    return await res.json();
  } catch (error) {
    console.error(`Error en la petición a ${endpoint}:`, error);
    throw error;
  }
};