import React from "react";
import "../styles/Estadisticas.css"

interface FiltrosFechasProps {
    desde: string;
    hasta: string;
    setDesde: (value: string) => void;
    setHasta: (value: string) => void;
    onDescargarExcel: () => void;
}

const FiltrosFechas: React.FC<FiltrosFechasProps> = ({ desde, hasta, setDesde, setHasta, onDescargarExcel }) => (
    <div className="containerFiltros">
        <h2 className="filtrosTitle">Filtrar por fecha</h2>
        <div className="inputsFiltros">
            <label>Desde: </label>
            <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
            <label style={{ marginLeft: 10 }}>Hasta: </label>
            <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        </div>
        <button className="downloadButton" onClick={onDescargarExcel} style={{ marginLeft: 10 }}>
            Descargar Excel
        </button>
    </div>
);

export default FiltrosFechas;
