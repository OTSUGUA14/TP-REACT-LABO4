package supercell.instrumentos.backend.controller;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import supercell.instrumentos.backend.service.ReporteService;

import java.io.IOException;
import java.time.LocalDate;

@RestController
@RequestMapping("/reportes")
@CrossOrigin(origins = "*") // Puedes especificar tu frontend aquí en lugar de "*"
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/pedidos/excel")
    public ResponseEntity<byte[]> descargarReporte(
            @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate desde,
            @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate hasta) throws IOException {

        byte[] archivoExcel = reporteService.generarReportePedidos(desde, hasta);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ReportePedidos.xlsx")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(archivoExcel);
    }
}
