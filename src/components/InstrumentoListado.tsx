import { instrumentoType } from "../type/InstrumentoType";
import "../styles/InstrumentoListado.css";
import { Link } from 'react-router-dom';
interface Props {
  instrumento: instrumentoType;
}
const InstrumentoListado = ({ instrumento }: Props) => {
  return (
    <div className="card" id={instrumento.id}>
      <img
        className="card-image"
        src={`/img/${instrumento.imagen}`}
        alt="Producto"
      />
      <div className="card-content">
        <div>
          <h3 className="title">{instrumento.instrumento}</h3>
          <h4 className="subtitle">{instrumento.marca}</h4>
          <h4 className="subtitle">{instrumento.modelo}</h4>
          <p className="price">${instrumento.precio}</p>

          {instrumento.costoEnvio === "G" ? (
            <p className="envio-gratis"><img className="camion" src="/img/camion.png" />Envío gratis a todo el país</p>
          ) : (
            <p className="envio-costo">
              Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}
            </p>
          )}
          <button className="detalle-btn">
            <Link to={`/instrumento/${instrumento.id}`}>Ver Detalle</Link>
          </button>
        </div>

        <p className="vendidos">{instrumento.cantidadVendida} vendidos</p>
      </div>
    </div>
  );
};

export default InstrumentoListado;
