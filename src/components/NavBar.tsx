import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import "../styles/NavBar.css";

const NavBar = () => {
  const { rol, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogout = () => {
    setMenuOpen(false);
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" style={{ position: "relative" }}>
        <h2 onClick={toggleMenu} style={{ cursor: "pointer" }}>Música Store</h2>
        {menuOpen && (
          <div className="logout-menu">
            <button onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/donde-estamos">Dónde Estamos</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/estadisticas">Estadísticas</Link></li>
        {rol === "ADMIN" && (
          <li><Link to="/admin">Admin</Link></li>
        )}
        <li><Link to="/carrito">🛒 Carrito</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
