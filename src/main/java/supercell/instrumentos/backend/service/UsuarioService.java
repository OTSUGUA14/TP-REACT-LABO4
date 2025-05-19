package supercell.instrumentos.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import supercell.instrumentos.backend.models.Usuario;
import supercell.instrumentos.backend.models.VerificacionResponse;
import supercell.instrumentos.backend.payload.UsuarioDTO;
import supercell.instrumentos.backend.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public String guardarUsuario(UsuarioDTO usuarioDTO){
        Usuario usuario = Usuario.builder()
            .nombreUsuario(usuarioDTO.nombreUsuario())
            .rol(usuarioDTO.rol())
            .build();
        usuario.setClave(usuarioDTO.clave());
        usuarioRepository.save(usuario);
        return "Usuario Agregado";
    }

    @Transactional
    public VerificacionResponse verificarCredenciales(UsuarioDTO usuarioDTO) {
        return usuarioRepository.findByNombreUsuario(usuarioDTO.nombreUsuario())
            .map(usuario -> {
                boolean valido = usuario.getClave().equals(usuario.encriptarClave(usuarioDTO.clave()));
                String rol = valido ? usuario.getRol().name() : null;  // Asumiendo que getRol() devuelve un enum
                return new VerificacionResponse(valido, rol);
            })
            .orElse(new VerificacionResponse(false, null));
    }

    
        @Transactional
    public Usuario patchUsuario(Long id, UsuarioDTO usuarioDTO) {
        return usuarioRepository.findById(id).map(usuario -> {
            if (usuarioDTO.nombreUsuario() != null && !usuarioDTO.nombreUsuario().isBlank()) {
                usuario.setNombreUsuario(usuarioDTO.nombreUsuario());
            }

            if (usuarioDTO.clave() != null && !usuarioDTO.clave().isBlank()) {
                usuario.setClave(usuarioDTO.clave());
            }

            if (usuarioDTO.rol() != null) {
                usuario.setRol(usuarioDTO.rol());
            }

            return usuarioRepository.save(usuario);
        }).orElseThrow(() -> new EntityNotFoundException("No se encontró un usuario con el ID: " + id));
    }
}
