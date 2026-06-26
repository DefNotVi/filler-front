import React, { useState } from 'react';
import { PerfilProvider } from './context/PerfilContext';
import { ResumenProvider } from './context/ResumenContext';
import { SwapPage } from './pages/SwapPage';
import { HistorialPage } from './pages/HistorialPage'; 
import { Flame, ClipboardList } from 'lucide-react'; // Iconos bonitos
import './App.css';

function App() {
  // Estado para controlar qué pestaña se muestra
  const [vistaActiva, setVistaActiva] = useState('swap');

  return (
    <PerfilProvider>
      <ResumenProvider>
        <div className="tinder-otaku-app">
          <div className="app-layout-container">
            
            {/* BARRA DE NAVEGACIÓN SUPERIOR */}
            <nav className="app-nav">
              <button 
                className={`nav-btn ${vistaActiva === 'swap' ? 'active' : ''}`} 
                onClick={() => setVistaActiva('swap')}
              >
                <Flame size={20} /> Votar Waifus/Husbando
              </button>
              <button 
                className={`nav-btn ${vistaActiva === 'historial' ? 'active' : ''}`} 
                onClick={() => setVistaActiva('historial')}
              >
                <ClipboardList size={20} /> Ver Historial
              </button>
            </nav>

            {/* CONTENIDO DINÁMICO SEGÚN LA PESTAÑA */}
            <main className="content-container">
              {vistaActiva === 'swap' ? <SwapPage /> : <HistorialPage />}
            </main>

          </div>
        </div>
      </ResumenProvider>
    </PerfilProvider>
  );
}

export default App;