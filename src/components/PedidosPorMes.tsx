import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "../styles/Estadisticas.css"

interface PedidoPorMes {
    mes: string;
    cantidad: number;
}

const PedidosPorMes: React.FC<{ data: PedidoPorMes[] }> = ({ data }) => (
    <>
        <div className="containerEstadisticasMes">
            <h2>Pedidos por mes/año</h2>
            <BarChart width={600} height={300} data={data}>
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
            </BarChart>
        </div>
    </>
);

export default PedidosPorMes;
