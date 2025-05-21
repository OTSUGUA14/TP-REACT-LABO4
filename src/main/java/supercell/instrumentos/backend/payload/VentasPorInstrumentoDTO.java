package supercell.instrumentos.backend.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VentasPorInstrumentoDTO {
    private Long instrumentoId;
    private String nombre;
    private int cantidadVendida;
}
