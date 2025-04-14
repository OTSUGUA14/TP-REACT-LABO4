package supercell.instrumentos.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import supercell.instrumentos.backend.models.Instrumento;
import supercell.instrumentos.backend.service.InstrumentoService;

@RestController
@RequestMapping("/instrumentos")
@CrossOrigin(origins = "*")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;
    
    @GetMapping("/getAll")
    public List<Instrumento> findAll(){
        return instrumentoService.getAllInstrumentos();
    }

    @GetMapping("/initialize")
    public void initialize(){
        instrumentoService.loadInstrumentos();
    }

    @GetMapping("/{ID}")
    public Optional<Instrumento> getInstrumento(@PathVariable Long ID){
        return instrumentoService.getInstrumento(ID);
    }
}
