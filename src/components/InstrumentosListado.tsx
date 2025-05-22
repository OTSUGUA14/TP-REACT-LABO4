// Importa los hooks de React y componentes necesarios
import { useEffect, useState } from 'react';
import InstrumentoCard from './InstrumentoCard';
import { InstrumentoType } from '../models/InstrumentoType';
import { instrumentosTodos } from '../servicios/FuncionesApi';

export const InstrumentosListado = () => {
  // Estado local para almacenar la lista de instrumentos
  const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);

  // useEffect se ejecuta una vez al montar el componente para obtener los datos desde la API
  useEffect(() => {
    instrumentosTodos()
      .then(data => setInstrumentos(data))
      .catch(error => console.error('Error al cargar los datos:', error));
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
