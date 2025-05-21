import { useEffect, useState, useRef } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    PieChart, Pie, Cell, Legend
} from "recharts";
import { instrumentosTodos, obtenerPedidosAgrupadosPorMes, obtenerVentasPorInstrumento } from "../servicios/FuncionesApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { InstrumentoType } from "../models/InstrumentoType";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#a29bfe"];
interface PedidoPorMes {
    anio: number;
    mes: number;
    cantidad: number;
}

// Importamos las funciones para obtener los datos desde la API


const Estadisticas = () => {
    const [pedidosPorMes, setPedidosPorMes] = useState<PedidoPorMes[]>([]);
    const [ventasPorInstrumento, setVentasPorInstrumento] = useState<any[]>([]);
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");

    // Nuevo estado para lista de instrumentos
    const [instrumentos, setInstrumentos] = useState<InstrumentoType[]>([]);
    // Estado para instrumento seleccionado
    const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<InstrumentoType | null>(null);

    // Ref para el div que vamos a convertir a PDF
    const detalleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            const pedidosMes = await obtenerPedidosAgrupadosPorMes();
            setPedidosPorMes(pedidosMes);

            const ventasInstrumentos = await obtenerVentasPorInstrumento();
            setVentasPorInstrumento(ventasInstrumentos);

            // Cargar todos los instrumentos para el selector
            const instrumentosAll = await instrumentosTodos();

            setInstrumentos(instrumentosAll);

        };
        cargarDatos();
    }, []);



    const pedidosFormateados = pedidosPorMes.map(p => ({
        mes: `${p.anio}-${String(p.mes).padStart(2, '0')}`,
        cantidad: p.cantidad
    }));

    const descargarExcel = async () => {
        if (!desde || !hasta) {
            alert("Por favor seleccioná ambas fechas.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/reportes/pedidos/excel?desde=${desde}&hasta=${hasta}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                }
            );

            if (!response.ok) throw new Error("Error al descargar el archivo.");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `reporte_pedidos_${desde}_a_${hasta}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
        }
    };

    // Al cambiar el select, buscar el instrumento completo
    const handleSeleccionInstrumento = (id: string) => {
        const idNum = Number(id);
        const inst = instrumentos.find(i => i.id === idNum) || null;
        setInstrumentoSeleccionado(inst);
    };



    // Función para generar PDF del div detalleRef
    const generarPDF = async () => {
        if (!detalleRef.current) {
            alert("No hay detalle para generar PDF.");
            return;
        }

        const canvas = await html2canvas(detalleRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        // Dimensiones del canvas
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Dimensiones estándar de hoja A4 en px para jsPDF con unidad 'px'
        const pdfWidth = 595;  // ancho A4 en puntos (pt) ~ 210mm
        const pdfHeight = 842; // alto A4 en puntos (pt) ~ 297mm

        // Margen (opcional)
        const margin = 20;

        // Calculamos ancho y alto máximos para la imagen dentro del PDF (dejando margen)
        const maxWidth = pdfWidth - margin * 2;
        const maxHeight = pdfHeight - margin * 2;

        // Escalar la imagen para que encaje en el PDF manteniendo proporción
        let renderWidth = imgWidth;
        let renderHeight = imgHeight;

        if (imgWidth > maxWidth || imgHeight > maxHeight) {
            const widthRatio = maxWidth / imgWidth;
            const heightRatio = maxHeight / imgHeight;
            const scale = Math.min(widthRatio, heightRatio);
            renderWidth = imgWidth * scale;
            renderHeight = imgHeight * scale;
        }

        const pdf = new jsPDF({
            unit: 'pt',
            format: 'a4',
        });

        // Centramos la imagen en el PDF
        const x = (pdfWidth - renderWidth) / 2;
        const y = (pdfHeight - renderHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
        pdf.save(`Detalle_Instrumento_${instrumentoSeleccionado?.instrumento || 'sin_nombre'}.pdf`);
    };


    return (
        <div style={{ padding: 20 }}>
            <h2>Filtros</h2>
            <div style={{ marginBottom: 20 }}>
                <label>Desde: </label>
                <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
                <label style={{ marginLeft: 10 }}>Hasta: </label>
                <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
                <button onClick={descargarExcel} style={{ marginLeft: 10 }}>
                    Descargar Excel
                </button>
            </div>

            <h2>Pedidos por Mes/Año</h2>
            <BarChart width={600} height={300} data={pedidosFormateados}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>

            <h2>Pedidos por Instrumento</h2>
            {ventasPorInstrumento.length > 0 && (
                <PieChart width={1500} height={500}>
                    <Pie
                        data={ventasPorInstrumento}
                        dataKey="cantidadVendida"
                        nameKey="nombre"
                        cx="40%" cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label={({ name }) => name.length > 20 ? name.slice(0, 20) + '...' : name}
                    >
                        {ventasPorInstrumento.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{
                            fontSize: '12px',
                            maxHeight: 400,
                            overflowY: 'auto'
                        }}
                    />
                </PieChart>
            )}

            {/* NUEVO: Selector de instrumentos */}
            <h2>Detalle Instrumento para PDF</h2>
            <select
                onChange={e => handleSeleccionInstrumento(e.target.value)}
                value={instrumentoSeleccionado ? String(instrumentoSeleccionado.id) : ""}

            >
                <option value="">-- Seleccione un instrumento --</option>
                {instrumentos.map(i => (
                    <option key={i.id} value={i.id}>
                        {i.instrumento}
                    </option>
                ))}
            </select>

            {instrumentoSeleccionado && (
                <>
                    {/* Renderizamos el detalle dentro de un div con ref para el PDF */}
                    <div
                        ref={detalleRef}
                        style={{
                            border: "1px solid #ccc",
                            marginTop: 20,
                            padding: 20,
                            width: 600,
                            fontFamily: "'Arial', sans-serif",
                        }}
                    >
                        <h3>{instrumentoSeleccionado.instrumento}</h3>
                        <img
                            src={`/img/${instrumentoSeleccionado.imagen}`}
                            alt={instrumentoSeleccionado.instrumento}
                            style={{ maxWidth: "100%", height: "auto", marginBottom: 10 }}
                        />
                        <p><strong>Descripción:</strong> {instrumentoSeleccionado.descripcion}</p>
                        <p><strong>Precio:</strong> ${instrumentoSeleccionado.precio}</p>
                        <p><strong>Marca:</strong> {instrumentoSeleccionado.marca}</p>
                        <p><strong>Modelo:</strong> {instrumentoSeleccionado.modelo}</p>
                        <p><strong>Cantidad Vendida:</strong> {instrumentoSeleccionado.cantidadVendida}</p>
                        <p><strong>Costo Envío:</strong> {instrumentoSeleccionado.costoEnvio === "G" ? "Envío Gratis" : `$${instrumentoSeleccionado.costoEnvio}`}</p>
                    </div>

                    <button onClick={generarPDF} style={{ marginTop: 10 }}>
                        Descargar PDF del Instrumento
                    </button>
                </>
            )}
        </div>
    );
};

export default Estadisticas;