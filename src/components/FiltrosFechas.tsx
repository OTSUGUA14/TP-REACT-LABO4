import React from "react";

interface FiltrosFechasProps {
    desde: string;
    hasta: string;
    setDesde: (value: string) => void;
    setHasta: (value: string) => void;
    onDescargarExcel: () => void;
}

const FiltrosFechas: React.FC<FiltrosFechasProps> = ({ desde, hasta, setDesde, setHasta, onDescargarExcel }) => (
    <div style={{ marginBottom: 20 }}>
        <h2>Filtros</h2>
        <label>Desde: </label>
        <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        <label style={{ marginLeft: 10 }}>Hasta: </label>
        <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        <button onClick={onDescargarExcel} style={{ marginLeft: 10 }}>
            Descargar Excel
        </button>
    </div>
);

export default FiltrosFechas;
