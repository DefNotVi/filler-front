import React, { useContext } from 'react';
import { ResumenContext } from '../context/ResumenContext';

export const HistorialPage = () => {
  const { historial, cargandoResumen, refrescarHistorial } = useContext(ResumenContext);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📋 Historial de Reacciones (Backend Resumen)</h2>
      <button onClick={refrescarHistorial} style={{ marginBottom: '15px', padding: '8px 12px', cursor: 'pointer' }}>
        🔄 Actualizar
      </button>

      {cargandoResumen ? (
        <p>Cargando historial...</p>
      ) : historial.length === 0 ? (
        <p>Aún no hay reacciones registradas.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {historial.map((reaccion) => (
            <li 
              key={reaccion.id} 
              style={{
                padding: '12px',
                marginBottom: '10px',
                borderRadius: '8px',
                backgroundColor: reaccion.accion === 'LIKE' ? '#e6fffa' : '#ffeeee',
                border: reaccion.accion === 'LIKE' ? '1px solid #319795' : '1px solid #e53e3e',
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <strong>{reaccion.nombre}</strong> <span style={{ fontSize: '0.9em', color: '#666' }}>({reaccion.anime})</span>
              </div>
              <span style={{
                fontWeight: 'bold',
                color: reaccion.accion === 'LIKE' ? '#234e52' : '#742a2a'
              }}>
                {reaccion.accion === 'LIKE' ? '❤️ LIKE' : '❌ DISLIKE'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};