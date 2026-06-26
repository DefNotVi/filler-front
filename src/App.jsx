import React from 'react';
import { PerfilProvider } from './context/PerfilContext';
import { ResumenProvider } from './context/ResumenContext'; // Añadimos el nuevo contexto
import { SwapPage } from './pages/SwapPage';
import './App.css';

function App() {
  return (
    <PerfilProvider>
      <ResumenProvider> {/* Envolvemos aquí para habilitar las llamadas de resumen */}
        <div className="tinder-otaku-app">
          <SwapPage />
        </div>
      </ResumenProvider>
    </PerfilProvider>
  );
}

export default App;