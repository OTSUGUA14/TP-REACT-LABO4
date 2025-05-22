import React from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#a29bfe"];

const PedidosPorInstrumento: React.FC<{ data: any[] }> = ({ data }) => {
    if (!data.length) return null;

    return (
        <>
            <h2>Pedidos por Instrumento</h2>
            <PieChart width={1500} height={500}>
                <Pie
                    data={data}
                    dataKey="cantidadVendida"
                    nameKey="nombre"
                    cx="40%" cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name }) => name.length > 20 ? name.slice(0, 20) + '...' : name}
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ fontSize: '12px', maxHeight: 400, overflowY: 'auto' }}
                />
            </PieChart>
        </>
    );
};

export default PedidosPorInstrumento;
