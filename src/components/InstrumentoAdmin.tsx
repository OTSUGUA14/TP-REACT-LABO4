import { useState } from "react";
import { instrumentoType } from "../models/InstrumentoType";

interface Props {
    instrumento: instrumentoType;
    onModify: (instrumento: instrumentoType) => void;
}

const InstrumentoAdmin = ({ instrumento, onModify }: Props) => {
    const [showFullDesc, setShowFullDesc] = useState(false);

    const categoriaSwitch = (idCategoria: any) => {
        switch (idCategoria) {
            case 1:
                return "Cuerda";
            case 2:
                return "Viento";
            case 3:
                return "Percusión";
            case 4:
                return "Teclado";
            case 5:
                return "Electrónico";
            default:
                return idCategoria;
        }
    };

    const deleteInstrumento = async (idInstumento: string) => {
        await fetch(`http://localhost:8080/instrumentos/delete/${idInstumento}`, {
            method: 'DELETE'
        });
        window.location.reload();
    };


    return (
        <div className="row" id={instrumento.id}>
            <div className="col">
                {instrumento.id}
            </div>
            <div className="col">
                {instrumento.instrumento}
            </div>
            <div className="col">
                {categoriaSwitch(instrumento.idCategoria)}
            </div>
            <div className="col">
                {instrumento.modelo}
            </div>
            <div className="col">
                <img src={`/img/${instrumento.imagen}`} alt={instrumento.imagen} />
            </div>
            <div className="col">
                {instrumento.marca}
            </div>
            <div className="col">
                ${instrumento.precio}
            </div>
            <div className="col">
                {instrumento.costoEnvio === "G" ? instrumento.costoEnvio : `$${instrumento.costoEnvio}`}
            </div>
            <div className="col">
                {instrumento.cantidadVendida}
            </div>
            <div className="col">
                <div style={{ whiteSpace: "pre-wrap" }}>
                    {showFullDesc ? instrumento.descripcion : instrumento.descripcion.slice(0, 100) + "..."}
                </div>
                {instrumento.descripcion.length > 100 && (
                    <button
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        style={{ background: "none", border: "none", color: "blue", cursor: "pointer", padding: 0 }}
                    >
                        {showFullDesc ? "Mostrar menos" : "Ver más"}
                    </button>
                )}
            </div>
            <div className="col">
                <a className="modify" onClick={() => onModify(instrumento)}>Modificar</a>
            </div>
            <div className="col">
                <a className="delete" onClick={() => deleteInstrumento(instrumento.id)}>Eliminar</a>
            </div>
        </div>
    );
};

export default InstrumentoAdmin;
