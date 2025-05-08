package supercell.instrumentos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import supercell.instrumentos.backend.models.Pedido;
import supercell.instrumentos.backend.models.PedidoDetalle;
import supercell.instrumentos.backend.repository.InstrumentoRepository;
import supercell.instrumentos.backend.repository.PedidoRepository;

import java.time.LocalDate;

@Service
public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private InstrumentoRepository instrumentoRepository;

    public Pedido guardarPedido(Pedido pedido) {
        double total = 0.0;
    
        pedido.setFechaPedido(LocalDate.now());
    
        for (PedidoDetalle detalle : pedido.getDetalles()) {
            var instrumento = instrumentoRepository.findById(detalle.getInstrumento().getID())
                .orElseThrow(() -> new RuntimeException("Instrumento no encontrado"));
    
            detalle.setInstrumento(instrumento);
            detalle.setPedido(pedido);
    
            total += instrumento.getPrecio() * detalle.getCantidad();
        }
    
        pedido.setTotalPedido(total);
    
        return pedidoRepository.save(pedido);
    }
    
}
