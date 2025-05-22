import { InstrumentoType } from "../models/InstrumentoType";
import "../styles/InstrumentoListado.css";
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { toast } from 'react-toastify';

// Define la estructura de las props que recibe el componente
interface Props {
  instrumento: InstrumentoType;
}

// Componente para mostrar una tarjeta de instrumento
const InstrumentoCard = ({ instrumento }: Props) => {
  const { agregarProducto } = useCarrito(); // Hook para agregar productos al carrito

  // Evento para agregar un instrumento al carrito
  const handleAgregarAlCarrito = () => {
    agregarProducto({
      id: (instrumento.id),
      nombre: instrumento.instrumento,
      precio: instrumento.precio,
      cantidad: 1
    });
    toast.success(`${instrumento.instrumento} agregado al carrito 🛒`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="card" id={instrumento.id.toString()}>
      {/* Imagen del instrumento */}
      <img
        className="card-image"
        src={`/img/${instrumento.imagen}`}
        alt="Producto"
      />

      <div className="card-content">
        <div>
          {/* Información básica del instrumento */}
          <h3 className="title">{instrumento.instrumento}</h3>
          <h4 className="subtitle">{instrumento.marca}</h4>
          <h4 className="subtitle">{instrumento.modelo}</h4>
          <p className="price">${instrumento.precio}</p>

          {/* Condicional para mostrar si tiene envío gratis o no */}
          {instrumento.costoEnvio === "G" ? (
            <p className="envio-gratis">
              <img className="camion" src="/img/camion.png" />
              Envío gratis a todo el país
            </p>
          ) : (
            <p className="envio-costo">
              Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}
            </p>
          )}

          {/* Botón para ver el detalle del instrumento */}
          <button className="detalle-btn">
            <Link to={`/instrumento/${instrumento.id}`}>Ver Detalle</Link>
          </button>
        </div>

        {/* Cantidad de unidades vendidas */}
        <p className="vendidos">{instrumento.cantidadVendida} vendidos</p>

        {/* Botón para agregar al carrito */}
        <button
          className="agregar-carrito-btn"
          onClick={handleAgregarAlCarrito}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default InstrumentoCard;
