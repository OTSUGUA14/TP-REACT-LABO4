package supercell.instrumentos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import supercell.instrumentos.backend.models.PedidoDetalle;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {
}
