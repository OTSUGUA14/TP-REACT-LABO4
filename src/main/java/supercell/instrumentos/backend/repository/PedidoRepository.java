package supercell.instrumentos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import supercell.instrumentos.backend.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
