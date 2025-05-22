import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { InstrumentoType } from "../models/InstrumentoType";

interface Props {
    instrumentos: InstrumentoType[];
    instrumentoSeleccionado: InstrumentoType | null;
    setInstrumentoSeleccionado: (i: InstrumentoType | null) => void;
}

const DetalleInstrumentoPDF: React.FC<Props> = ({ instrumentos, instrumentoSeleccionado, setInstrumentoSeleccionado }) => {
    const detalleRef = useRef<HTMLDivElement>(null);

    const handleSeleccion = (id: string) => {
        const inst = instrumentos.find(i => i.id === Number(id)) || null;
        setInstrumentoSeleccionado(inst);
    };

    const generarPDF = async () => {
        if (!detalleRef.current) return;
        const canvas = await html2canvas(detalleRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({ unit: "pt", format: "a4" });
        const pdfWidth = 595;
        const pdfHeight = 842;
        const margin = 20;
        const maxWidth = pdfWidth - margin * 2;
        const maxHeight = pdfHeight - margin * 2;

        let { width, height } = canvas;
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;

        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        pdf.addImage(imgData, "PNG", x, y, width, height);
        pdf.save(`Detalle_Instrumento_${instrumentoSeleccionado?.instrumento || 'sin_nombre'}.pdf`);
    };

    return (
        <>
            <h2>Detalle Instrumento para PDF</h2>
            <select onChange={(e) => handleSeleccion(e.target.value)} value={instrumentoSeleccionado?.id ?? ""}>
                <option value="">-- Seleccione un instrumento --</option>
                {instrumentos.map(i => (
                    <option key={i.id} value={i.id}>{i.instrumento}</option>
                ))}
            </select>

            {instrumentoSeleccionado && (
                <>
                    <div ref={detalleRef} style={{ border: "1px solid #ccc", marginTop: 20, padding: 20, width: 600 }}>
                        <h3>{instrumentoSeleccionado.instrumento}</h3>
                        <img src={`/img/${instrumentoSeleccionado.imagen}`} alt={instrumentoSeleccionado.instrumento} style={{ maxWidth: "100%", height: "auto", marginBottom: 10 }} />
                        <p><strong>Descripción:</strong> {instrumentoSeleccionado.descripcion}</p>
                        <p><strong>Precio:</strong> ${instrumentoSeleccionado.precio}</p>
                        <p><strong>Marca:</strong> {instrumentoSeleccionado.marca}</p>
                        <p><strong>Modelo:</strong> {instrumentoSeleccionado.modelo}</p>
                        <p><strong>Cantidad Vendida:</strong> {instrumentoSeleccionado.cantidadVendida}</p>
                        <p><strong>Costo Envío:</strong> {instrumentoSeleccionado.costoEnvio === "G" ? "Envío Gratis" : `$${instrumentoSeleccionado.costoEnvio}`}</p>
                    </div>
                    <button onClick={generarPDF} style={{ marginTop: 10 }}>Descargar PDF del Instrumento</button>
                </>
            )}
        </>
    );
};

export default DetalleInstrumentoPDF;
