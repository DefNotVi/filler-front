import React, { createContext, useState, useEffect } from 'react';

export const PerfilContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PerfilProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
  const [perfilActual, setPerfilActual] = useState(null);
  const [mensajeMatch, setMensajeMatch] = useState("");
  const [cargando, setCargando] = useState(true);

  // Función utilitaria para obtener las cabeceras con el token JWT
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/perfiles`, {
      method: 'GET',
      headers: getAuthHeaders() // Se añade el header de autenticación
    })
      .then(response => {
        if (response.status === 401 || response.status === 403) {
          // Si el token no es válido o expiró, forzamos deslogueo reactivo
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          window.location.reload(); 
          throw new Error("Sesión expirada o no autorizada");
        }
        return response.json();
      })
      .then(data => {
        setPerfiles(data);
        if (data.length > 0) setPerfilActual(data[0]);
        setCargando(false);
      })
      .catch(error => {
        console.error("Error cargando perfiles desde el backend:", error);
        setCargando(false);
      });
  }, []);

  const enviarReaccion = (accion) => {
    if (!perfilActual) return;
    setMensajeMatch(""); 

    // Guardar en el backend principal (filler-back-main) mediante el ApiGateway
    fetch(`${API_BASE_URL}/api/perfiles/reaccion`, {
      method: 'POST',
      headers: getAuthHeaders(), // Se añade el header de autenticación
      body: JSON.stringify({ perfilId: perfilActual.id, accion })
    })
      .then(response => {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          window.location.reload();
          throw new Error("Sesión inválida al intentar reaccionar");
        }
        return response.json();
      })
      .then(data => {
        setMensajeMatch(data.mensaje);

        // Guardar en el backend de resumen (filler-resumen)
        fetch(`${API_BASE_URL}/api/v1/resumen/api/reacciones`, {
          method: 'POST',
          headers: getAuthHeaders(), // Se añade el header de autenticación
          body: JSON.stringify({
            perfilId: perfilActual.id,
            nombre: perfilActual.nombre,
            anime: perfilActual.animeOOrigen,
            accion: accion
          })
        })
          .then(res => res.json())
          .then(resumenGuardado => console.log("Historial guardado en resumen:", resumenGuardado))
          .catch(err => console.error("Error al reportar al backend de resumen:", err));

        // Pasar al siguiente perfil en la interfaz de usuario
        const nuevosPerfiles = perfiles.slice(1);
        setPerfiles(nuevosPerfiles);
        setPerfilActual(nuevosPerfiles.length > 0 ? nuevosPerfiles[0] : null);
      })
      .catch(error => console.error("Error al reaccionar:", error));
  };

  return (
    <PerfilContext.Provider value={{ perfilActual, mensajeMatch, cargando, enviarReaccion }}>
      {children}
    </PerfilContext.Provider>
  );
};