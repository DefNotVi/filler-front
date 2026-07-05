import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { obtenerPerfil } from "../service/profileService";

export const UserMenu = ({ onLogout, onEditarPerfil }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Otaku";

  useEffect(() => {
    obtenerPerfil()
      .then((data) => {
        setUsuario(data);
      })
      .catch((error) => {
        console.error("Error obteniendo perfil:", error);
      });

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditarPerfil = () => {
    setIsOpen(false);
    navigate("/perfil");
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        className="user-avatar-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Ver Perfil"
      >
        {usuario?.fotoPerfil ? (
          <img
            src={`http://localhost:8080/uploads/${usuario.fotoPerfil}`}
            alt="Perfil"
            className="user-avatar-image"
          />
        ) : (
          <User size={20} />
        )}
      </button>

      {isOpen && (
        <div className="user-dropdown-menu">

          <div className="dropdown-user-info">
            <span className="username-text">
              @{usuario?.username || username}
            </span>

            <span className="user-role">
              {usuario?.nombre
                ? `${usuario.nombre} ${usuario.apellido}`
                : "Súper Dúo"}
            </span>
          </div>

          <button
            className="dropdown-profile-btn"
            onClick={handleEditarPerfil}
          >
            <Settings size={16} />
            Editar Perfil
          </button>

          <button
            className="dropdown-logout-btn"
            onClick={onLogout}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>

        </div>
      )}
    </div>
  );
};