package supercell.instrumentos.backend.payload;

// src/main/java/com/tuapp/dto/PedidoReporteDTO.java


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class PedidoReporteDTO {
    private LocalDate fecha;
    private String cliente;
    private String instrumento;
    private int cantidad;
    private double total;
}
