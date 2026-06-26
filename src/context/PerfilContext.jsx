import React, { createContext, useState, useEffect } from 'react';

export const PerfilContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PerfilProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
  const [perfilActual, setPerfilActual] = useState(null);
  const [mensajeMatch, setMensajeMatch] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Corregido a comillas invertidas (Backticks) para que inyecte bien la variable
    fetch(`${API_BASE_URL}/api/perfiles`)
      .then(response => response.json())
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

    // 1. Guardar en el backend principal (filler-back-main)
    fetch(`${API_BASE_URL}/api/perfiles/reaccion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ perfilId: perfilActual.id, accion })
    })
      .then(response => response.json())
      .then(data => {
        setMensajeMatch(data.mensaje);

        // 2. NUEVO: Guardar en el backend de resumen (filler-resumen) usando los datos de perfilActual
        fetch(`${API_BASE_URL}/api/v1/resumen/api/reacciones`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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

        // 3. Pasar al siguiente perfil en la interfaz de usuario
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