package supercell.instrumentos.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import supercell.instrumentos.backend.models.CategoriaInstrumento;

@Repository
public interface CategoriaRepositorio extends JpaRepository<CategoriaInstrumento, Long>{

}
