import React from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../screens/Home";
import DondeEstamos from "../screens/DondeEstamos";
import Productos from "../screens/Productos";
import InstrumentoDetalle from "../screens/DetalleInstrumento";

export function AppRouter() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/instrumento/:id" element={<InstrumentoDetalle />} />
      </Routes>
    </>
  );
}
