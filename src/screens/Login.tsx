import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { agregarUsuario, verificarUsuario } from "../servicios/FuncionesApi";
import "../styles/Login.css"

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
      const data = await verificarUsuario(usuarioDTO);

      if (data.valido) {
        setMensaje(`Login exitoso ✅ - Rol: ${data.rol}`);
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
      const data = await agregarUsuario(usuarioDTO);
      console.log(data);
      setMensaje("Usuario creado ✅");
    } catch (error: any) {
      console.error("Error al registrar:", error);
      setMensaje("Error al conectar con el servidor: " + error.message);
    }

  };



  return (
    <div className="containerLogin">
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
        <button type="submit" className="buttonForm buttonLogin">Login</button>
      </form>

      <button className="buttonForm"
        onClick={handleRegister}
      >
        Crear cuenta
      </button>

      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
};

export default Login;
