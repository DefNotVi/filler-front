import React, { useContext } from 'react';
import { UserMenu } from '../components/UserMenu';
import { ResumenContext } from '../context/ResumenContext';
import { RefreshCw } from 'lucide-react'; // Icono moderno para refrescar

export const HistorialPage = ({ onLogout, cambiarVista }) => {
  const { historial, cargandoResumen, refrescarHistorial } = useContext(ResumenContext);

  // Asegura siempre un arreglo para iterar sin errores
  const listaHistorial = Array.isArray(historial) ? historial : [];

  return (
    <div className="historial-container">
      <header className="app-header header-with-action">
        <div className="header-title-block">
          <h2 className="historial-title" style={{ margin: 0 }}>📋 Historial de Decisiones</h2>
          <p className="subtitle" style={{ margin: '5px 0 0 0' }}>Tus interacciones registradas</p>
        </div>
        <UserMenu onLogout={onLogout} cambiarVista={cambiarVista} />
      </header>
      
      <button onClick={refrescarHistorial} className="btn-refresh" style={{ marginTop: '15px' }}>
        <RefreshCw size={16} /> Actualizar Datos
      </button>

      {cargandoResumen ? (
        <p style={{ color: '#8d8d99', marginTop: '15px' }}>Buscando registros en el archivo...</p>
      ) : listaHistorial.length === 0 ? (
        <p style={{ color: '#8d8d99', marginTop: '15px' }}>Ninguna waifu o husbando calificado todavía.</p>
      ) : (
        <ul className="historial-list">
          {listaHistorial.map((reaccion) => (
            <li 
              key={reaccion.id} 
              className={`historial-item ${reaccion.accion === 'LIKE' ? 'like-item' : 'dislike-item'}`}
            >
              <div>
                <strong>{reaccion.nombre}</strong>{' '}
                <span style={{ fontSize: '0.85rem', color: '#8d8d99' }}>({reaccion.anime})</span>
              </div>
              <span className={`badge-accion ${reaccion.accion === 'LIKE' ? 'like' : 'dislike'}`}>
                {reaccion.accion === 'LIKE' ? '❤️ LIKE' : '❌ DISLIKE'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};