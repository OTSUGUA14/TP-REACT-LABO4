import { useEffect, useState } from 'react';
import Instrumento from './Instrumento';
import { instrumentoType } from '../type/InstrumentoType';

export const Instrumentos = () => {
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
      <h1>INSTRUMENTOS MUSICALES</h1>
      {instrumentos.map((instrumento) => (
        <Instrumento key={instrumento.id} instrumento={instrumento} />
      ))}

    </div>
  );
};

export default Instrumentos
