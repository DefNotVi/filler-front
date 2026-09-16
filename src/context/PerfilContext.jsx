import React, { createContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { fetchConToken } from '../api';

export const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [perfiles, setPerfiles] = useState([]);
  const [perfilActual, setPerfilActual] = useState(null);
  const [mensajeMatch, setMensajeMatch] = useState("");
  const [cargando, setCargando] = useState(true);

  // Cargar perfiles al iniciar sesión
  useEffect(() => {
    const cargarPerfiles = async () => {
      if (accounts.length === 0) return;
      
      try {
        const data = await fetchConToken('/api/perfiles', instance, accounts[0]);
        setPerfiles(data);
        if (data && data.length > 0) setPerfilActual(data[0]);
      } catch (error) {
        console.error("Error cargando perfiles:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarPerfiles();
  }, [accounts, instance]);

  // Enviar reaccion al reaccionar a un perfil
  const enviarReaccion = async (accion) => {
    if (!perfilActual || accounts.length === 0) return;
    setMensajeMatch(""); 

    try {
      // 1. Guardar reacción en el backend principal a través del API Gateway
      const data = await fetchConToken('/api/perfiles/reaccion', instance, accounts[0], {
        method: 'POST',
        body: JSON.stringify({ perfilId: perfilActual.id, accion })
      });

      setMensajeMatch(data.mensaje);

      // 2. Reportar al servicio de resumen
      fetchConToken('/api/v1/resumen/api/reacciones', instance, accounts[0], {
        method: 'POST',
        body: JSON.stringify({
          perfilId: perfilActual.id,
          nombre: perfilActual.nombre,
          anime: perfilActual.animeOOrigen,
          accion: accion
        })
      })
      .then(resumenGuardado => console.log("Historial guardado en resumen:", resumenGuardado))
      .catch(err => console.error("Error al reportar al backend de resumen:", err));

      // 3. Avanzar al siguiente perfil en pantalla
      const nuevosPerfiles = perfiles.slice(1);
      setPerfiles(nuevosPerfiles);
      setPerfilActual(nuevosPerfiles.length > 0 ? nuevosPerfiles[0] : null);

    } catch (error) {
      console.error("Error al procesar reaccion:", error);
    }
  };

  return (
    <PerfilContext.Provider value={{ perfilActual, mensajeMatch, cargando, enviarReaccion }}>
      {children}
    </PerfilContext.Provider>
  );
};