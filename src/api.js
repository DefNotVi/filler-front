import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./AuthConfig";

export const fetchConToken = async (url, instance, account) => {
  try {
    // 1. Obtiene el token de forma silenciosa desde Azure
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: account
    });
    
    const token = response.accessToken;

    // 2. Envía la petición con el token en el Header Authorization
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return await res.json();
  } catch (error) {
    console.error("Error al obtener token o consultar API:", error);
  }
};