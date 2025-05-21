package supercell.instrumentos.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import supercell.instrumentos.backend.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query("SELECT YEAR(p.fechaPedido) as anio, MONTH(p.fechaPedido) as mes, COUNT(p) as cantidad " +
            "FROM Pedido p " +
            "GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido) " +
            "ORDER BY anio, mes")
    List<Object[]> contarPedidosPorMesYAnio();

}
