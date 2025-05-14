// Importa los hooks de React y componentes necesarios
import { useEffect, useState } from 'react';
import InstrumentoCard from './InstrumentoCard';
import { instrumentoType } from '../models/InstrumentoType';

export const InstrumentosListado = () => {
  // Estado local para almacenar la lista de instrumentos
  const [instrumentos, setInstrumentos] = useState<instrumentoType[]>([]);

  // useEffect se ejecuta una vez al montar el componente para obtener los datos desde la API
  useEffect(() => {
    fetch('http://localhost:8080/instrumentos/getAll')
      .then((response) => response.json()) // Convierte la respuesta en JSON
      .then((data) => setInstrumentos(data)) // Guarda los datos en el estado
      .catch((error) => console.error('Error al cargar los datos:', error)); // Manejo de errores
  }, []);

  return (
    <div>
      {/* Título centrado */}
      <center><h1>INSTRUMENTOS MUSICALES</h1></center>

      {/* Mapea cada instrumento para renderizar su componente correspondiente */}
      {instrumentos.map((instrumento) => (
        <div key={instrumento.id}>
          <InstrumentoCard instrumento={instrumento} />
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InstrumentosListado;
