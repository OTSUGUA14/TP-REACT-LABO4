import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instrumentoType } from "../models/InstrumentoType";
import "../styles/InstrumentoDetalle.css";
import { useCarrito } from '../context/CarritoContext'; 

const InstrumentoDetalle = () => {
  // Accede a la función para agregar productos al carrito
  const { agregarProducto } = useCarrito();
  
  // Obtiene el id del parámetro de la URL
  const { id } = useParams();
  console.log("Param recibido:", id);

  // Estado para almacenar el instrumento cargado y para manejar errores
  const [instrumento, setInstrumento] = useState<instrumentoType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Si no hay id, no hacer la solicitud
    
    // Hace la solicitud para obtener los detalles del instrumento
    fetch(`http://localhost:8080/instrumentos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al cargar el instrumento'); // Maneja errores si la respuesta no es exitosa
        }
        return res.json();
      })
      .then((data) => {
        setInstrumento(data); // Si la solicitud es exitosa, actualiza el estado con el instrumento
        console.log("Instrumento cargado:", data);
      })
      .catch((error) => {
        console.error(error);
        setError("No se pudo cargar el instrumento."); // Maneja errores de la solicitud
      });
  }, [id]); // Se ejecuta cada vez que el id cambia

  // Si hay un error, muestra el mensaje de error
  if (error) return <p>{error}</p>;
  
  // Si el instrumento aún no está cargado, muestra un mensaje de carga
  if (!instrumento) return <p>Cargando...</p>;

  // Extrae los detalles del instrumento
  const { instrumento: nombre, imagen, descripcion, cantidadVendida, precio, marca, modelo, costoEnvio } = instrumento;

  // Función para agregar el instrumento al carrito
  const handleAgregarAlCarrito = () => {
    if (!instrumento) return; // Si no hay instrumento, no hacer nada

    agregarProducto({
      id: parseInt(instrumento.id), // Asegura que el id sea un número entero
      nombre: instrumento.instrumento,
      precio: instrumento.precio,
      cantidad: 1 // Se agrega una cantidad inicial de 1
    });
  };

  return (
    <div className="detalle-container">
      <h2>Componente Detalle Instrumento:</h2>
      <div className="detalle-content">
        {/* IZQUIERDA: Muestra la imagen del instrumento y su descripción */}
        <div className="detalle-izquierda">
          <img src={`/img/${imagen}`} alt={`Imagen de ${nombre}`} className="detalle-img" />
          <p><strong>Descripción:</strong> {descripcion}</p>
        </div>

        {/* DERECHA: Muestra los detalles del instrumento, incluyendo precio, marca, etc. */}
        <div className="detalle-derecha">
          <p className="vendidos">{cantidadVendida} vendidos</p>
          <h3>{nombre}</h3>
          <p className="precio">${precio}</p>
          <p><strong>Marca:</strong> {marca}</p>
          <p><strong>Modelo:</strong> {modelo}</p>

          {/* Muestra el costo de envío si es gratuito o el costo específico */}
          <div className="envio">
            <strong>Costo Envío:</strong>{" "}
            {costoEnvio === "G" ? (
              <p className="envio-gratis">
                <img className="camion" src="/img/camion.png" alt="envío" /> Envío gratis
              </p>
            ) : (
              <p className="envio-costo">
                Costo de Envío Interior de Argentina: ${costoEnvio}
              </p>
            )}
          </div>

          {/* Botón para agregar el instrumento al carrito */}
          <button className="agregar-btn" onClick={handleAgregarAlCarrito}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentoDetalle;
