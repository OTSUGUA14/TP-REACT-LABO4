package supercell.instrumentos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import supercell.instrumentos.backend.models.Instrumento;
import supercell.instrumentos.backend.models.Pedido;
import supercell.instrumentos.backend.models.PedidoDetalle;
import supercell.instrumentos.backend.payload.PedidosPorMesDTO;
import supercell.instrumentos.backend.repository.InstrumentoRepository;
import supercell.instrumentos.backend.repository.PedidoRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import java.util.List;

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
            System.out.println(detalle.getCantidad());
            Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(detalle.getInstrumento().getID());
            Instrumento instrumento = instrumentoOptional.get();
    
            detalle.setInstrumento(instrumento);
            detalle.setPedido(pedido);
            System.out.println("Instrumento Precio: " + instrumento.getPrecio());
    
            total += instrumento.getPrecio() * detalle.getCantidad();
        }
    
        pedido.setTotalPedido(total);
        System.out.println("Total: " + pedido.getTotalPedido());
        System.out.println("Fecha: " + pedido.getFechaPedido());
        return pedidoRepository.save(pedido);
    }

    public List<PedidosPorMesDTO> obtenerPedidosAgrupadosPorMesYAnio() {
    List<Object[]> resultados = pedidoRepository.contarPedidosPorMesYAnio();
    List<PedidosPorMesDTO> respuesta = new ArrayList<>();

    for (Object[] fila : resultados) {
        int anio = (int) fila[0];
        int mes = (int) fila[1];
        long cantidad = (long) fila[2];
        respuesta.add(new PedidosPorMesDTO(anio, mes, cantidad));
    }

    return respuesta;
}
    
}
