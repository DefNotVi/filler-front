import React, { useState } from 'react';
import { Sparkles, KeyRound, User, Mail } from 'lucide-react';

export const LoginPage = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    setCargando(true);

    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegister 
      ? { username, password, email } 
      : { username, password };

    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Ocurrió un error inesperado');
      }

      if (isRegister) {
        setMensaje('¡Registro exitoso! Ya puedes iniciar sesión.');
        setIsRegister(false);
        setPassword('');
      } else {
        const jsonAuth = JSON.parse(data);
        localStorage.setItem('token', jsonAuth.token);
        localStorage.setItem('username', jsonAuth.username);
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <header className="app-header">
          <h1>
            <Sparkles className="icon-spin" /> Filler Auth <Sparkles className="icon-spin" />
          </h1>
          <p className="subtitle">
            {isRegister ? 'Crea tu cuenta para buscar tu dúo' : 'Ingresa al Tinder Otaku'}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="auth-input-wrapper">
            <User size={18} className="auth-icon" />
            <input
              type="text"
              className="auth-field"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {isRegister && (
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-icon" />
              <input
                type="email"
                className="auth-field"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-input-wrapper">
            <KeyRound size={18} className="auth-icon" />
            <input
              type="password"
              className="auth-field"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="feedback-popup is-friendzone">{error}</div>}
          {mensaje && <div className="feedback-popup is-match">{mensaje}</div>}

          <button type="submit" className="auth-submit-btn" disabled={cargando}>
            {cargando ? 'Invocando servidor...' : isRegister ? 'Registrarse' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="auth-toggle">
          <button 
            type="button" 
            className="toggle-link-btn"
            onClick={() => { setIsRegister(!isRegister); setError(''); setMensaje(''); }}
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate aquí'}
          </button>
        </div>
      </div>
    </div>
  );
};