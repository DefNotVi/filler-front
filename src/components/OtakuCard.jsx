import React, { useContext } from 'react';
import { Heart, X } from 'lucide-react';
import { PerfilContext } from '../context/PerfilContext';

export const OtakuCard = () => {
  const { perfilActual, enviarReaccion } = useContext(PerfilContext);

  if (!perfilActual) return null;

  // Si la foto es una ruta relativa (como "/cpp.jpg"), le pega la API Base, si no, usa la URL directa de Imgur
  const urlImagen = perfilActual.fotoUrl?.startsWith('http')
    ? perfilActual.fotoUrl
    : `${import.meta.env.VITE_API_BASE_URL}${perfilActual.fotoUrl}`;

  return (
    <div className="otaku-card">
      <div className="card-image-container">
        <img 
          src={urlImagen} 
          alt={perfilActual.nombre} 
          className="card-image" 
          onError={(e) => {
            e.target.src = "https://i.imgur.com/fGBdnlD.png";
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