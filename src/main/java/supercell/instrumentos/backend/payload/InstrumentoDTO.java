package supercell.instrumentos.backend.payload;

public record InstrumentoDTO (
    String instrumento,
    String marca,
    String modelo,
    String imagen,
    double precio,
    String costoEnvio,
    int cantidadVendida,
    String descripcion
){}
