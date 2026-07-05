import React, { useContext } from 'react';
import { UserMenu } from '../components/UserMenu';
import { ResumenContext } from '../context/ResumenContext';
import { RefreshCw } from 'lucide-react'; // Icono moderno para refrescar

export const HistorialPage = ({ onLogout, onEditarPerfil }) => {
  const { historial, cargandoResumen, refrescarHistorial } = useContext(ResumenContext);

  return (
    <div className="historial-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
  <UserMenu
    onLogout={onLogout}
    onEditarPerfil={onEditarPerfil}
  />
</div>
      <h2 className="historial-title">📋 Historial de Decisiones</h2>
      
      <button onClick={refrescarHistorial} className="btn-refresh">
        <RefreshCw size={16} /> Actualizar Datos
      </button>

      {cargandoResumen ? (
        <p style={{ color: '#8d8d99', marginTop: '15px' }}>Buscando registros en el archivo...</p>
      ) : historial.length === 0 ? (
        <p style={{ color: '#8d8d99', marginTop: '15px' }}>Ninguna waifu o husbando calificado todavía.</p>
      ) : (
        <ul className="historial-list">
          {historial.map((reaccion) => (
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