import React, { createContext, useState, useEffect, useContext } from 'react';

// Exportamos el contexto directamente para poder importarlo en las páginas/componentes
export const PerfilContext = createContext();

export const PerfilProvider = ({ children }) => {
  const [perfiles, setPerfiles] = useState([]);
  const [perfilActual, setPerfilActual] = useState(null);
  const [mensajeMatch, setMensajeMatch] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/perfiles')
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

    fetch('http://localhost:8080/api/perfiles/reaccion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ perfilId: perfilActual.id, accion })
    })
      .then(response => response.json())
      .then(data => {
        setMensajeMatch(data.mensaje);

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