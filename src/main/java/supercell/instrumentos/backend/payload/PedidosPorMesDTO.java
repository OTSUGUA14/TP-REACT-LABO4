package supercell.instrumentos.backend.payload;

public class PedidosPorMesDTO {
    private int anio;
    private int mes;
    private long cantidad;

    public PedidosPorMesDTO(int anio, int mes, long cantidad) {
        this.anio = anio;
        this.mes = mes;
        this.cantidad = cantidad;
    }

    public int getAnio() {
        return anio;
    }

    public int getMes() {
        return mes;
    }

    public long getCantidad() {
        return cantidad;
    }
}
