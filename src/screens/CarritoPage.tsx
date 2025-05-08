import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../styles/Carrito.css';

const CarritoPage = () => {
  // Accede al carrito y la función para limpiarlo desde el contexto
  const { carrito, limpiarCarrito } = useCarrito();
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes al usuario

  // Calcula el total sumando precio * cantidad de cada producto
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Función para guardar el carrito como un pedido
  const guardarCarrito = async () => {
    const pedido = {
      productos: carrito,
      fecha: new Date().toISOString(), // Fecha actual en formato ISO
      total
    };

    try {
      // Envia el pedido al backend
      const response = await fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedido)
      });

      // Si la respuesta no es exitosa, lanza un error
      if (!response.ok) throw new Error('Error al guardar el pedido');

      const data = await response.json(); // Obtiene la respuesta del backend
      setMensaje(`El pedido con id ${data.id} se guardó correctamente`); // Muestra mensaje de éxito
      limpiarCarrito(); // Vacía el carrito
    } catch (error) {
      setMensaje('Hubo un error al guardar el pedido'); // Muestra mensaje de error
      console.error(error);
    }
  };

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Carrito</h1>

      {/* Lista los productos del carrito */}
      {carrito.map(producto => (
        <div key={producto.id} className="carrito-item">
          <span>{producto.nombre}</span>
          <span>${producto.precio} x {producto.cantidad}</span>
        </div>
      ))}

      {/* Muestra el total del carrito */}
      <p className="total">Total: ${total}</p>

      {/* Botón para guardar el carrito */}
      <button className="guardar-btn" onClick={guardarCarrito}>Guardar carrito</button>

      {/* Muestra el mensaje si existe */}
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default CarritoPage;
