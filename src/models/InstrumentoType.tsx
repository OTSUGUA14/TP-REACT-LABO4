export interface InstrumentoType {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string | number;
    cantidadVendida: number;
    descripcion: string;
    idCategoria: number;
}

export type InstrumentoCreateType = Omit<InstrumentoType, 'id'>;