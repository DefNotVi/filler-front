import React, { useEffect, useState } from "react";
import { obtenerPerfil } from "../service/profileService";

const PerfilPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerPerfil()
      .then((data) => {
        setUsuario(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error obteniendo perfil:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <h2>Cargando perfil...</h2>;
  }

  if (!usuario) {
    return <h2>No se pudo cargar el perfil.</h2>;
  }

  return (
    <div className="perfil-page">
      <h1>Mi Perfil</h1>

      {usuario.fotoPerfil && (
        <img
          src={`http://localhost:8080/uploads/${usuario.fotoPerfil}`}
          alt="Foto de perfil"
          width={150}
        />
      )}

      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Apellido:</strong> {usuario.apellido}</p>
      <p><strong>Usuario:</strong> {usuario.username}</p>
      <p><strong>Correo:</strong> {usuario.email}</p>
    </div>
  );
};

export default PerfilPage;