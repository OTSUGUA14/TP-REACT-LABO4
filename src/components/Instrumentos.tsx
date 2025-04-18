import { useEffect, useState } from 'react';
import Instrumento from './Instrumento';
import { instrumentoType } from '../type/InstrumentoType';

export const Instrumentos = () => {
  const [instrumentos, setInstrumentos] = useState<instrumentoType[]>([]);

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
        <Instrumento key={instrumento.id} instrumento={instrumento} />
      ))}

    </div>
  );
};

export default Instrumentos
