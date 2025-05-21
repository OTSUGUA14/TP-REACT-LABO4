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

export class PedidoCart {
    constructor(
        public detalles: PedidoDetalle[],
          public fecha: string // ⬅️ importante para agrupar por mes/año
    ) { }
}
