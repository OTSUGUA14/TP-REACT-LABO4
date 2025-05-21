package supercell.instrumentos.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import supercell.instrumentos.backend.models.Pedido;
import supercell.instrumentos.backend.payload.PedidosPorMesDTO;
import supercell.instrumentos.backend.payload.VentasPorInstrumentoDTO;
import supercell.instrumentos.backend.service.PedidoService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*") // Puedes especificar tu frontend aquí en lugar de "*"
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        Pedido nuevoPedido = pedidoService.guardarPedido(pedido);
        return ResponseEntity.ok(nuevoPedido); // <-- 200 OK en lugar de 201 Created
    }

    @GetMapping("/agrupados-por-mes")
    public ResponseEntity<List<PedidosPorMesDTO>> obtenerPedidosAgrupados() {
        return ResponseEntity.ok(pedidoService.obtenerPedidosAgrupadosPorMesYAnio());
    }

    @GetMapping("/ventas-por-instrumento")
    public ResponseEntity<List<VentasPorInstrumentoDTO>> obtenerVentasPorInstrumento() {
        return ResponseEntity.ok(pedidoService.obtenerVentasPorInstrumento());
    }

 

}
