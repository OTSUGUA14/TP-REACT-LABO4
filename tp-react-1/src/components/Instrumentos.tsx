import React, { useEffect, useState } from 'react';
import Instrumento from './Instrumento';
import { IInstrumento } from '../type/IInstrumento';

const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<IInstrumento[]>([]);

  useEffect(() => {
    // Cargar el archivo JSON desde la carpeta public
    fetch('/instrumentos.json')
      .then((response) => response.json())
      .then((data) => setInstrumentos(data.instrumentos))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);
  return (
    <div>
      <h1>INSTRUMENTOS MUSICALES</h1>
      {instrumentos.map((instrumento) => (
        <Instrumento
          id={instrumento.id}
          instrumento={instrumento.instrumento}
          marca={instrumento.marca}
          modelo={instrumento.modelo}
          imagen={instrumento.imagen}
          precio={instrumento.precio}
          costoEnvio={instrumento.costoEnvio}
          cantidadVendida={instrumento.cantidadVendida}
          descripcion={instrumento.descripcion}
        />
      ))}
    </div>
  );
};

export default Instrumentos
