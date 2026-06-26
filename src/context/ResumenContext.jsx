import React, { createContext, useState, useEffect } from 'react';

export const ResumenContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ResumenProvider = ({ children }) => {
  const [historial, setHistorial] = useState([]);
  const [cargandoResumen, setCargandoResumen] = useState(false);

  // Función para obtener todas las reacciones desde el backend de resumen a través del Gateway
  const obtenerHistorial = () => {
    setCargandoResumen(true);
    fetch(`${API_BASE_URL}/api/v1/resumen/api/reacciones`)
      .then(response => response.json())
      .then(data => {
        setHistorial(data);
        setCargandoResumen(false);
      })
      .catch(error => {
        console.error("Error al obtener el historial de resumen:", error);
        setCargandoResumen(false);
      });
  };

  // Cargar el historial automáticamente al montar el contexto
  useEffect(() => {
    obtenerHistorial();
  }, []);

  return (
    <ResumenContext.Provider value={{ historial, cargandoResumen, refrescarHistorial: obtenerHistorial }}>
      {children}
    </ResumenContext.Provider>
  );
};