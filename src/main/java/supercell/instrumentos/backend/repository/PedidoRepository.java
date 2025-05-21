package supercell.instrumentos.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import supercell.instrumentos.backend.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    // Tu query existente
    @Query("SELECT YEAR(p.fechaPedido) as anio, MONTH(p.fechaPedido) as mes, COUNT(p) as cantidad " +
            "FROM Pedido p " +
            "GROUP BY YEAR(p.fechaPedido), MONTH(p.fechaPedido) " +
            "ORDER BY anio, mes")
    List<Object[]> contarPedidosPorMesYAnio();

    // Método para filtrar pedidos por rango de fechas
    @Query("SELECT p FROM Pedido p WHERE p.fechaPedido BETWEEN :desde AND :hasta")
    List<Pedido> findByFechaPedidoBetween(@Param("desde") LocalDate desde, @Param("hasta") LocalDate hasta);
}
