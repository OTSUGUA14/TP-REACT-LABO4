import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../screens/Home";
import DondeEstamos from "../screens/DondeEstamos";
import Productos from "../screens/Productos";
import InstrumentoDetalle from "../screens/DetalleInstrumento";
import Admin from "../screens/Admin";
import CarritoPage from "../screens/CarritoPage";
import Login from "../screens/Login";
import Estadisticas from "../screens/Estadisticas";


export function AppRouter() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/instrumento/:id" element={<InstrumentoDetalle />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<CarritoPage />} />
      </Routes>
    </>
  );
}
