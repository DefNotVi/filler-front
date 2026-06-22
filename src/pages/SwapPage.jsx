import React, { useContext } from 'react'; // Importamos useContext nativo
import { Sparkles } from 'lucide-react';
import { PerfilContext } from '../context/PerfilContext'; // Importamos el contexto plano
import { OtakuCard } from '../components/OtakuCard';

export const SwapPage = () => {
  // Consumo nativo del contexto
  const { perfilActual, mensajeMatch, cargando } = useContext(PerfilContext);

  if (cargando) {
    return <div className="loading">Invocando el ganado otaku desde el backend...</div>;
  }

  return (
    <div className="swap-page">
      <header className="app-header">
        <h1>
          <Sparkles className="icon-spin" /> Tinder Otaku/Geek <Sparkles className="icon-spin" />
        </h1>
        <p className="subtitle">Encuentra tu media naranja (o tu contraparte de dúo en Lol)</p>
      </header>

      <main className="card-container">
        {perfilActual ? (
          <OtakuCard />
        ) : (
          <div className="no-more-profiles">
            <h2>No more Larping...</h2>
            <p>No quedan más especímenes disponibles.</p>
          </div>
        )}

        {mensajeMatch && (
          <div className={`feedback-popup ${mensajeMatch.includes('¡Felicidades!') ? 'is-match' : 'is-friendzone'}`}>
            {mensajeMatch}
          </div>
        )}
      </main>
    </div>
  );
};