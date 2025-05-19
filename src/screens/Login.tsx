import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setRol } = useUser();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const usuarioDTO = {
      nombreUsuario,
      clave,
    };
  
    try {
      const response = await fetch("http://localhost:8080/usuario/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioDTO),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en la respuesta");
      }
  
      // Aquí esperamos el objeto { valido, rol }
      const data = await response.json();
      console.log(data);
  
      if (data.valido) {
        setMensaje(`Login exitoso ✅ - Rol: ${data.rol}`);
        // Guardar el rol en localStorage o en un estado global si querés usarlo para mostrar NavBar
        localStorage.setItem("rolUsuario", data.rol);
        setRol(data.rol);
        navigate("/home");
      } else {
        setMensaje("Credenciales incorrectas ❌");
      }
    } catch (error: any) {
      console.error("Error al verificar:", error);
      setMensaje("Error al conectar con el servidor: " + error.message);
    }
  };
  
  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const usuarioDTO = {
      nombreUsuario,
      clave,
      rol: "VISOR",
    };
  
    try {
      const response = await fetch("http://localhost:8080/usuario/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioDTO),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en la respuesta");
      }
  
      const data = await response.json();
      console.log(data);
      setMensaje("Usuario creado ✅");
    } catch (error: any) {
      console.error("Error al registrar:", error);
      setMensaje("Error al conectar con el servidor: " + error.message);
    }
  };
  
  

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "2rem" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" style={{ marginTop: "1.5rem" }}>Login</button>
      </form>

        <button
            style={{
                marginTop: "1rem",
                backgroundColor: "#ccc",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer",
            }}
            onClick={handleRegister} // <--- Aquí está el cambio
            >
            Crear cuenta
        </button>

      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
};

export default Login;
