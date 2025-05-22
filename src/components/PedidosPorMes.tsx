import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface PedidoPorMes {
    mes: string;
    cantidad: number;
}

const PedidosPorMes: React.FC<{ data: PedidoPorMes[] }> = ({ data }) => (
    <>
        <h2>Pedidos por Mes/Año</h2>
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
        </BarChart>
    </>
);

export default PedidosPorMes;
