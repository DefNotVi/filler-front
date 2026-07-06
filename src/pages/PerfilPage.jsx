import React, { useState } from 'react';
import { User, Mail, ShieldCheck, Save, ArrowLeft } from 'lucide-react';

export const PerfilPage = ({ cambiarVista }) => {
  const currentUsername = localStorage.getItem('username') || '';
  
  const [username, setUsername] = useState(currentUsername);
  const [email, setEmail] = useState(localStorage.getItem('email') || ''); // Nuevo estado para el mail
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleActualizar = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          currentUsername: currentUsername, // Quien es actualmente
          newUsername: username,            // Su nuevo nickname
          email: email                      // Su nuevo mail
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Error al actualizar los datos');
      }

      // Sincronizar el LocalStorage local con los datos reales guardados en DB
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      
      setMensaje('¡Base de datos actualizada con éxito!');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="seccion-perfil-unica">
      <div className="tarjeta-otaku-perfil">
        <div className="avatar-placeholder">
          <User size={50} />
        </div>
        
        <h2 className="titulo-perfil-texto">Mi Perfil Otaku</h2>
        <p className="subtitulo-perfil-texto">Sincronización en tiempo real con DB</p>

        <form onSubmit={handleActualizar} className="formulario-perfil-limpio">
          
          <label className="etiqueta-perfil-campo">Nombre de Usuario</label>
          <div className="bloque-input-perfil">
            <User size={18} className="icono-campo-perfil" />
            <input
              type="text"
              className="input-campo-perfil"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* NUEVO CAMPO: CORREO ELECTRÓNICO */}
          <label className="etiqueta-perfil-campo" style={{ marginTop: '14px' }}>Correo Electrónico</label>
          <div className="bloque-input-perfil">
            <Mail size={18} className="icono-campo-perfil" />
            <input
              type="email"
              className="input-campo-perfil"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu-correo@anime.com"
            />
          </div>

          <label className="etiqueta-perfil-campo" style={{ marginTop: '14px' }}>Rango del Sistema</label>
          <div className="bloque-input-perfil campo-desactivado-perfil">
            <ShieldCheck size={18} className="icono-campo-perfil" />
            <input
              type="text"
              className="input-campo-perfil"
              value="Súper Invocador"
              disabled
            />
          </div>

          {error && <div className="alerta-perfil error-color">{error}</div>}
          {mensaje && <div className="alerta-perfil exito-color">{mensaje}</div>}

          <button type="submit" className="boton-perfil-guardar" disabled={cargando}>
            <Save size={18} />
            {cargando ? 'Sincronizando BD...' : 'Actualizar Datos'}
          </button>
        </form>

        <div className="boton-perfil-regresar" onClick={() => cambiarVista('swap')} role="button">
          <ArrowLeft size={16} /> Volver a Votar
        </div>
      </div>
    </div>
  );
};