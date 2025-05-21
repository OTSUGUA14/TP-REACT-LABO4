import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext"; // ajusta la ruta según tu proyecto
import "../styles/NavBar.css";

const NavBar = () => {
  const { rol } = useUser();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>Música Store</h2>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/donde-estamos">Dónde Estamos</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/estadisticas">Estadisticas</Link></li>
        {rol === "ADMIN" && (
          <li><Link to="/admin">Admin</Link></li>
        )}
        <li><Link to="/carrito">🛒 Carrito</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
