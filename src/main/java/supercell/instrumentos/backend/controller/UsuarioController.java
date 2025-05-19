package supercell.instrumentos.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import supercell.instrumentos.backend.models.Usuario;
import supercell.instrumentos.backend.models.VerificacionResponse;
import supercell.instrumentos.backend.payload.UsuarioDTO;
import supercell.instrumentos.backend.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        Map<String, String> response = new HashMap<>();
        response.put("mensaje", usuarioService.guardarUsuario(usuarioDTO));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @PatchMapping("/patch/{ID}")
        public ResponseEntity<Usuario> patchUsuario(@PathVariable Long ID, @RequestBody UsuarioDTO usuarioDTO){
        Usuario nuevoUsuario = usuarioService.patchUsuario(ID, usuarioDTO);
        return ResponseEntity.ok(nuevoUsuario);
    }

    @PostMapping("/verify")
    public ResponseEntity<VerificacionResponse> verificarCredenciales(@RequestBody UsuarioDTO usuarioDTO) {
        VerificacionResponse resultado = usuarioService.verificarCredenciales(usuarioDTO);
        return ResponseEntity.ok(resultado);
    }

}
