import { useEffect, useState } from "react";
import {
    obtenerPedidosAgrupadosPorMes,
    obtenerVentasPorInstrumento,
    instrumentosTodos,
    descargarReportePedidosExcel
} from "../servicios/FuncionesApi";
import type { InstrumentoType } from "../models/InstrumentoType";

import FiltrosFechas from "../components/FiltrosFechas";
import PedidosPorMes from "../components/PedidosPorMes";
import PedidosPorInstrumento from "../components/PedidosPorInstrumento";
import DetalleInstrumentoPDF from "../components/DetalleInstrumentoPDF";
import "../styles/Estadisticas.css"
interface PedidoPorMes {
    anio: number;
    mes: number;
    cantidad: number;
}

const Estadisticas = () => {
    const [pedidosPorMes, setPedidosPorMes] = useState<PedidoPorMes[]>([]);
    const [ventasPorInstrumento, setVentasPorInstrumento] = useState<any[]>([]);
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<InstrumentoType | null>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            const pedidos = await obtenerPedidosAgrupadosPorMes();
            const ventas = await obtenerVentasPorInstrumento();
            const todosInstrumentos = await instrumentosTodos();

            setPedidosPorMes(pedidos);
            setVentasPorInstrumento(ventas);
            setInstrumentos(todosInstrumentos);
        };
        cargarDatos();
    }, []);

    const pedidosFormateados = pedidosPorMes.map(p => ({
        mes: `${p.anio}-${String(p.mes).padStart(2, '0')}`,
        cantidad: p.cantidad
    }));

    const descargarExcel = async () => {
        try {
            const blob = await descargarReportePedidosExcel(desde, hasta);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `reporte_pedidos_${desde}_a_${hasta}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            alert(error instanceof Error ? error.message : "Error desconocido");
        }
    };


    return (
        <div  style={{ padding: 20 }}>
            <PedidosPorMes data={pedidosFormateados} />
            <PedidosPorInstrumento data={ventasPorInstrumento} />
            <div className="containerFiltro">
                <FiltrosFechas
                    desde={desde}
                    hasta={hasta}
                    setDesde={setDesde}
                    setHasta={setHasta}
                    onDescargarExcel={descargarExcel}
                />
                <DetalleInstrumentoPDF
                    instrumentos={instrumentos}
                    instrumentoSeleccionado={instrumentoSeleccionado}
                    setInstrumentoSeleccionado={setInstrumentoSeleccionado}
                />
            </div>

        </div>
    );
};

export default Estadisticas;
