import React, { useContext } from 'react';
import { Heart, X } from 'lucide-react';
import { PerfilContext } from '../context/PerfilContext';

export const OtakuCard = () => {
  const { perfilActual, enviarReaccion } = useContext(PerfilContext);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!perfilActual) return null;

  // Construimos la URL del proxy de tu backend
  // encodeURIComponent asegura que el link de internet no rompa los parámetros de la URL
  const urlImagenConProxy = `${API_BASE_URL}/api/perfiles/proxy-image?url=${encodeURIComponent(perfilActual.fotoUrl)}`;

  return (
    <div className="otaku-card">
      <div className="card-image-container">
        <img 
          src={urlImagenConProxy} 
          alt={perfilActual.nombre} 
          className="card-image" 
          onError={(e) => {
            // Salvavidas por si un link llega a caerse (Muestra un placeholder gracioso)
            e.target.src = "https://via.placeholder.com/300x400?text=Error+al+cargar+waifu";
          }}
        />
        <div className="badge-olor">Olor: {perfilActual.nivelDeOlor}/10 🧄</div>
      </div>
      
      <div className="card-info">
        <h2>{perfilActual.nombre} <span className="origen">({perfilActual.animeOOrigen})</span></h2>
        <p className="description">{perfilActual.descripcion}</p>
      </div>

      <div className="card-actions">
        <button onClick={() => enviarReaccion('DISLIKE')} className="btn-action btn-dislike">
          <X size={28} />
        </button>
        <button onClick={() => enviarReaccion('LIKE')} className="btn-action btn-like">
          <Heart size={28} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};