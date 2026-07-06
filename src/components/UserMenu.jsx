import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings } from 'lucide-react';

export const UserMenu = ({ onLogout, cambiarVista }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const username = localStorage.getItem('username') || 'Otaku';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button className="user-avatar-btn" onClick={() => setIsOpen(!isOpen)} title="Ver Perfil">
        <User size={20} />
      </button>

      {isOpen && (
        <div className="user-dropdown-menu">
          <div className="dropdown-user-info">
            <span className="username-text">@{username}</span>
            <span className="user-role">Online</span>
          </div>
          
          {/* Al hacer clic, navega a la página de perfil */}
          <button className="dropdown-item-btn" onClick={() => { cambiarVista('perfil'); setIsOpen(false); }}>
            <Settings size={16} /> Configurar Cuenta
          </button>
          
          <button className="dropdown-logout-btn" onClick={onLogout}>
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};