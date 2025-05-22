import { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../styles/Carrito.css';
import { InstrumentoPedido, PedidoCart, PedidoDetalle } from '../models/PedidoCart';
import CheckoutMP from '../components/ChekoutMP';
import { guardarPedido } from '../servicios/FuncionesApi';

const CarritoPage = () => {
  // Accede al carrito y la función para limpiarlo desde el contexto
  const { carrito, limpiarCarrito } = useCarrito();
  const [mensaje, setMensaje] = useState<string | null>(null); // Estado para mostrar mensajes al usuario

  // Calcula el total sumando precio * cantidad de cada producto
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  // Función para guardar el carrito como un pedido
  const guardarCarrito = async () => {
    const pedido = new PedidoCart(
      carrito.map(p => new PedidoDetalle(
        new InstrumentoPedido(p.id), // solo pasás el ID
        p.cantidad
      )),
      new Date().toISOString() // ⬅️ fecha en formato estándar ISO (ideal para backend)
    );


    try {
      const data = await guardarPedido(pedido);
      setMensaje(`El pedido con id ${data.id} se guardó correctamente`);
      limpiarCarrito();
    } catch (error) {
      setMensaje('Hubo un error al guardar el pedido');
      console.error(error);
    }

  };

  return (
    <div className="carrito-container">
      <h1 className="carrito-title">Carrito</h1>

      {/* Lista los productos del carrito */}
      {carrito.map(producto => (
        <div key={producto.id} className="carrito-item">
          <span>{producto.nombre} x {producto.cantidad}</span>
          <span>${producto.precio} </span>
        </div>
      ))}

      {/* Muestra el total del carrito */}
      <p className="total">Total: ${total}</p>

      {/* Botón para guardar el carrito */}
      <button className="guardar-btn" onClick={guardarCarrito}>Guardar carrito</button>

      {/* Muestra el mensaje si existe */}
      {mensaje && <p className="mensaje">{mensaje}</p>}
      <CheckoutMP montoCarrito={total} itemsCarrito={carrito} ></CheckoutMP>
    </div>
  );
};

export default CarritoPage;
