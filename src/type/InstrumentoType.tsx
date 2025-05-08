export interface instrumentoType {
    id: string;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    idCategoria: string;
}

export interface InstrumentoPedido {
    id: number;
    instrumento: string;
    precio: number;
}

export interface PedidoDetalle {
    instrumento: InstrumentoPedido;
    cantidad: number;
}

export interface Pedido {
    detalles: PedidoDetalle[];
}
