import { useEffect, useState } from 'react';
import { instrumentoType } from '../type/InstrumentoType';
import InstrumentoAdmin from './InstrumentoAdmin';
import "../styles/Admin.css";

export const InstrumentosAdmin = () => {
  const [instrumentos, setInstrumentos] = useState<instrumentoType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    instrumento: "",
    marca: "",
    modelo: "",
    imagen: "",
    precio: 0,
    costoEnvio: 0,
    cantidadVendida: 0,
    descripcion: "",
    idCategoria: 0
  });
  const [instrumentoToModify, setInstrumentoToModify] = useState<instrumentoType | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/instrumentos/getAll')
      .then((response) => response.json())
      .then((data) => setInstrumentos(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "idCategoria" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      costoEnvio: formData.costoEnvio === 0 ? "G" : Number(formData.costoEnvio)
    };
    

    if (instrumentoToModify) {
      // PATCH request to update the instrument
      fetch(`http://localhost:8080/instrumentos/patch/${instrumentoToModify.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (res.ok) {
            alert("Instrumento modificado");
            window.location.reload();
          } else {
            alert("Error al modificar");
          }
        })
        .catch((err) => console.error(err));
    } else {
      // POST request to add a new instrument
      fetch('http://localhost:8080/instrumentos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (res.ok) {
            alert("Instrumento enviado (ficticio)");
            window.location.reload();
          } else {
            alert("Error al enviar");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleModifyClick = (instrumento: instrumentoType) => {
    setInstrumentoToModify(instrumento);
    setFormData({
      instrumento: instrumento.instrumento,
      marca: instrumento.marca,
      modelo: instrumento.modelo,
      imagen: instrumento.imagen,
      precio: instrumento.precio,
      costoEnvio: instrumento.costoEnvio === "G" ? 0 : Number(instrumento.costoEnvio),
      cantidadVendida: instrumento.cantidadVendida,
      descripcion: instrumento.descripcion,
      idCategoria: Number(instrumento.idCategoria),
    });    
    setShowModal(true);  // Show the modal
  };

  return (
    <div className="container text-center">
      <br />
      <a className="new-item" onClick={() => setShowModal(true)}>Nuevo</a>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>{instrumentoToModify ? "Modificar Instrumento" : "Nuevo Instrumento"}</h4>
            <form autoComplete='off' onSubmit={handleSubmit} >
              <label htmlFor="instrumento">Instrumento</label>
              <input
                type="text"
                id="instrumento"
                name="instrumento"
                value={formData.instrumento}
                onChange={handleInputChange}
                placeholder="Instrumento"
                required
              />
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleInputChange}
                placeholder="Marca"
                required
              />
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleInputChange}
                placeholder="Modelo"
                required
              />
              <label htmlFor="imagen">Imagen</label>
              <input
                type="text"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleInputChange}
                placeholder="Imagen"
                required
              />
              <label htmlFor="precio">Precio</label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                placeholder="Precio"
                required
              />
              <label htmlFor="costoEnvio">Costo de Envío</label>
              <input
                type="number"
                id="costoEnvio"
                name="costoEnvio"
                value={formData.costoEnvio}
                onChange={handleInputChange}
                placeholder="Costo envío / G"
                required
              />
              <label htmlFor="cantidadVendida">Cantidad Vendida</label>
              <input
                type="number"
                id="cantidadVendida"
                name="cantidadVendida"
                value={formData.cantidadVendida}
                onChange={handleInputChange}
                placeholder="Cantidad Vendida"
                required
              />
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
                required
              />
              <label htmlFor="idCategoria">Categoría: </label>
              <select
                id="idCategoria"
                name="idCategoria"
                value={formData.idCategoria}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="1">Cuerda</option>
                <option value="2">Viento</option>
                <option value="3">Percusión</option>
                <option value="4">Teclado</option>
                <option value="5">Electrónico</option>
              </select>
              <button type="submit">Enviar</button>
              <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col"><b>ID</b></div>
        <div className="col"><b>Instrumento</b></div>
        <div className="col"><b>Categoria</b></div>
        <div className="col"><b>Modelo</b></div>
        <div className="col"><b>Imagen</b></div>
        <div className="col"><b>Marca</b></div>
        <div className="col"><b>Precio</b></div>
        <div className="col"><b>Costo Envio</b></div>
        <div className="col"><b>Cantidad Vendida</b></div>
        <div className="col"><b>Descripción</b></div>
        <div className="col"><b>Modificar</b></div>
        <div className="col"><b>Eliminar</b></div>
      </div>

      {instrumentos.map((instrumento) => (
        <InstrumentoAdmin
          key={instrumento.id}
          instrumento={instrumento}
          onModify={handleModifyClick}
        />
      ))}
    </div>
  );
};

export default InstrumentosAdmin;
