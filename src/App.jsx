import React, { useState, useEffect } from 'react';
import { PerfilProvider } from './context/PerfilContext';
import { ResumenProvider } from './context/ResumenContext';
import { SwapPage } from './pages/SwapPage';
import { HistorialPage } from './pages/HistorialPage'; 
import { PerfilPage } from './pages/PerfilPage'; // Importamos la nueva página
import { LoginPage } from './pages/LoginPage';
import { Flame, ClipboardList } from 'lucide-react'; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [vistaActiva, setVistaActiva] = useState('swap');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <PerfilProvider>
      <ResumenProvider>
        <div className="tinder-otaku-app">
          <div className="app-layout-container">
            
            {/* NAV COMPACTO ORIGINAL (SÓLO 2 BOTONES) */}
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

            {/* CONTENIDO DINÁMICO SOPORTANDO TRES VISTAS */}
            <main className="content-container">
              {vistaActiva === 'swap' && (
                <SwapPage onLogout={handleLogout} cambiarVista={setVistaActiva} />
              )}
              
              {vistaActiva === 'historial' && (
                <HistorialPage onLogout={handleLogout} cambiarVista={setVistaActiva} />
              )}
      
            {vistaActiva === 'perfil' && (
                <PerfilPage cambiarVista={setVistaActiva} />
              )}
            </main>

          </div>
        </div>
      </ResumenProvider>
    </PerfilProvider>
  );
}

export default App;