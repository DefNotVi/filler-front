import React, { useState } from 'react';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { loginRequest } from './AuthConfig.js';
import { PerfilProvider } from './context/PerfilContext';
import { ResumenProvider } from './context/ResumenContext';
import { SwapPage } from './pages/SwapPage';
import { HistorialPage } from './pages/HistorialPage'; 
import { PerfilPage } from './pages/PerfilPage'; 
import { Flame, ClipboardList } from 'lucide-react'; 
import './App.css';

function App() {
  const { instance } = useMsal();
  const [vistaActiva, setVistaActiva] = useState('swap');

  // Función para cerrar sesión usando Azure MSAL
  const handleLogout = () => {
    instance.logoutRedirect();
  };

  // Función para iniciar sesión redirigiendo a Microsoft
  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <>
      {/* VISTA SI EL USUARIO NO HA INICIADO SESIÓN */}
      <UnauthenticatedTemplate>
        <div style={{ padding: '50px', textCenter: 'center', textAlign: 'center' }}>
          <h2>Bienvenido a Filler</h2>
          <p>Debes autenticarte con tu cuenta para continuar</p>
          <button 
            onClick={handleLogin} 
            style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px' }}
          >
            Iniciar Sesión con Microsoft
          </button>
        </div>
      </UnauthenticatedTemplate>

      {/* VISTA SI EL USUARIO YA INICIÓ SESIÓN CON AZURE */}
      <AuthenticatedTemplate>
        <PerfilProvider>
          <ResumenProvider>
            <div className="tinder-otaku-app">
              <div className="app-layout-container">
                
                {/* NAV COMPACTO ORIGINAL */}
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
      </AuthenticatedTemplate>
    </>
  );
}

export default App;