import React from 'react';
import { PerfilProvider } from './context/PerfilContext';
import { SwapPage } from './pages/SwapPage';
import './App.css';

function App() {
  return (
    <PerfilProvider>
      <div className="tinder-otaku-app">
        <SwapPage />
      </div>
    </PerfilProvider>
  );
}

export default App;