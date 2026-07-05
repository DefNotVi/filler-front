    const API = "http://localhost:8080";

    export async function obtenerPerfil() {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("No se pudo obtener el perfil");
        }

        return response.json();
    }