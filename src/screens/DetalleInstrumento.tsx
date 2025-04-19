import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instrumentoType } from "../type/InstrumentoType";
import "../styles/InstrumentoDetalle.css";

const InstrumentoDetalle = () => {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<instrumentoType | null>(null);

  useEffect(() => {
  fetch(`http://localhost:8080/instrumentos/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al cargar el instrumento');
      }
      return res.json();
    })
    .then((data) => {
      setInstrumento(data);
    })
    .catch((error) => {
      console.error(error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje de error en la UI
    });
}, [id]);

  if (!instrumento) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <h2>Componente Detalle Instrumento:</h2>
      <div className="detalle-content">
        {/* IZQUIERDA */}
        <div className="detalle-izquierda">
          <img src={`/img/${instrumento.imagen}`} alt={instrumento.instrumento} className="detalle-img" />
          <p><strong>Descripción:</strong> {instrumento.descripcion}</p>
        </div>

        {/* DERECHA */}
        <div className="detalle-derecha">
          <p className="vendidos">{instrumento.cantidadVendida} vendidos</p>
          <h3>{instrumento.instrumento}</h3>
          <p className="precio">${instrumento.precio}</p>
          <p><strong>Marca:</strong> {instrumento.marca}</p>
          <p><strong>Modelo:</strong> {instrumento.modelo}</p>

          <p className="envio">
            <strong>Costo Envío:</strong>{" "}
            {instrumento.costoEnvio === "G" ? (
              <>
                <p className="envio-gratis"><img className="camion" src="/img/camion.png" alt="envío" /> Envío gratis</p>
              </>
            ) : (
              <p className="envio-costo">
                Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}
              </p>
            )}
          </p>

          <button className="agregar-btn">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentoDetalle;
