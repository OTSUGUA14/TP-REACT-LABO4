package supercell.instrumentos.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import supercell.instrumentos.backend.models.Instrumento;
import supercell.instrumentos.backend.payload.InstrumentoDTO;
import supercell.instrumentos.backend.service.InstrumentoService;

@RestController
@RequestMapping("/instrumentos")
@CrossOrigin(origins = "*")
public class InstrumentoController {
    @Autowired
    private InstrumentoService instrumentoService;
    
    // Conseguir todos los instrumentos
    @GetMapping("/getAll")
    public List<Instrumento> findAll(){
        return instrumentoService.getAllInstrumentos();
    }

    // Iniciar base de datos
    @GetMapping("/initialize")
    public void initialize(){
        instrumentoService.loadCategorias();
        instrumentoService.loadInstrumentos();
    }

    // Conseguir instrumento individual
    @GetMapping("/{ID}")
    public Optional<Instrumento> getInstrumento(@PathVariable Long ID){
        return instrumentoService.getInstrumento(ID);
    }

    // Agregar instrumento

    @PostMapping("/add")
    public ResponseEntity<String> addInstrumento(@RequestBody InstrumentoDTO instrumentoDTO){
        return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.addInstrumento(instrumentoDTO));
    }

    // Eliminar instrumento
    @DeleteMapping("/delete/{ID}")
    public ResponseEntity<Boolean> delete(@PathVariable Long ID){
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(instrumentoService.delete(ID));
    }

    // Update instrumento
    @PatchMapping("/patch/{ID}")
    public ResponseEntity<Instrumento> patchInstrumento(@PathVariable Long ID, @RequestBody InstrumentoDTO instrumentoDTO){
        Instrumento nuevoInstrumento = instrumentoService.patchInstrumento(ID, instrumentoDTO);
        return ResponseEntity.ok(nuevoInstrumento);
    }
}
