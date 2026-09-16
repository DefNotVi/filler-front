import React, { createContext, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { fetchConToken } from '../api';

export const ResumenContext = createContext();

export const ResumenProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [historial, setHistorial] = useState([]);
  const [cargandoResumen, setCargandoResumen] = useState(false);

  const obtenerHistorial = async () => {
    if (accounts.length === 0) return;
    setCargandoResumen(true);

    try {
      const data = await fetchConToken('/api/v1/resumen/api/reacciones', instance, accounts[0]);
      setHistorial(data);
    } catch (error) {
      console.error("Error al obtener el historial de resumen:", error);
    } finally {
      setCargandoResumen(false);
    }
  };

  useEffect(() => {
    obtenerHistorial();
  }, [accounts, instance]);

  return (
    <ResumenContext.Provider value={{ historial, cargandoResumen, refrescarHistorial: obtenerHistorial }}>
      {children}
    </ResumenContext.Provider>
  );
};