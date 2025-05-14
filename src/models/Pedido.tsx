export class InstrumentoPedido {
    constructor(
        public id: number,
        public instrumento: string = '',
        public precio: number = 0
    ) { }
}

export class PedidoDetalle {
    constructor(
        public instrumento: InstrumentoPedido,
        public cantidad: number
    ) { }
}

export class Pedido {
    constructor(
        public detalles: PedidoDetalle[]
    ) { }
}
