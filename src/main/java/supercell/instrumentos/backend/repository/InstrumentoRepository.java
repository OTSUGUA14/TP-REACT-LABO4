package supercell.instrumentos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import supercell.instrumentos.backend.models.Instrumento;

@Repository
public interface InstrumentoRepository extends JpaRepository<Instrumento, Long>{

}
