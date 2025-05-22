import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarUsuario } from "../servicios/FuncionesApi";

const Registro = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [rol, setRol] = useState("VISOR"); // Valor por defecto correcto
  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const usuarioDTO = {
      nombreUsuario,
      clave,
      rol, // Ahora sí toma el valor seleccionado correctamente
    };

    try {
      const response = await agregarUsuario(usuarioDTO);

      if (response.ok) {
        setMensaje("Usuario creado ✅ Redirigiendo al login...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        const errorText = await response.text();
        setMensaje("Error al registrar: " + errorText);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje("No se pudo conectar al servidor");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Usuario:</label><br />
          <input
            type="text"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Clave:</label><br />
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="rol">Rol:</label><br />
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          >
            <option value="VISOR">VISOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" style={{ marginTop: "1.5rem" }}>Registrar</button>
      </form>
      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
};

export default Registro;
