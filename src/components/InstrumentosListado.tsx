import { useEffect, useState } from 'react';
import InstrumentoListado from './InstrumentoListado';
import { instrumentoType } from '../type/InstrumentoType';

export const InstrumentosListado = () => {
  const [instrumentos, setInstrumentos] = useState<instrumentoType[]>([]);

  useEffect(() => {
    // Cargar el archivo JSON desde la carpeta public
    fetch('http://localhost:8080/instrumentos/getAll')
      .then((response) => response.json())
      .then((data) => setInstrumentos(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);
  return (
    <div>
      <center><h1>INSTRUMENTOS MUSICALES</h1></center>
      {instrumentos.map((instrumento) => (
        <InstrumentoListado key={instrumento.id} instrumento={instrumento} />
      ))}

    </div>
  );
};

export default InstrumentosListado
