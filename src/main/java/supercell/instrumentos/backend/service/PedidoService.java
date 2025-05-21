package supercell.instrumentos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import supercell.instrumentos.backend.models.Instrumento;
import supercell.instrumentos.backend.models.Pedido;
import supercell.instrumentos.backend.models.PedidoDetalle;
import supercell.instrumentos.backend.payload.PedidosPorMesDTO;
import supercell.instrumentos.backend.payload.VentasPorInstrumentoDTO;
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

            Long instrumentoId = detalle.getInstrumento().getID();
            Optional<Instrumento> instrumentoOptional = instrumentoRepository.findById(instrumentoId);

            if (instrumentoOptional.isEmpty()) {
                throw new IllegalArgumentException("Instrumento con ID " + instrumentoId + " no encontrado");
            }

            Instrumento instrumento = instrumentoOptional.get();
            // ✅ Actualizar cantidad vendida
            instrumento.setCantidadVendida(instrumento.getCantidadVendida() + detalle.getCantidad());
            instrumentoRepository.save(instrumento); // Guardar los cambios en la base de datos

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

    public List<VentasPorInstrumentoDTO> obtenerVentasPorInstrumento() {
        List<Instrumento> instrumentos = instrumentoRepository.findAll();
        List<VentasPorInstrumentoDTO> respuesta = new ArrayList<>();

        for (Instrumento instrumento : instrumentos) {
            respuesta.add(new VentasPorInstrumentoDTO(
                    instrumento.getID(),
                    instrumento.getInstrumento(),
                    instrumento.getCantidadVendida()));
        }

        return respuesta;
    }

}
