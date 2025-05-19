package supercell.instrumentos.backend.payload;
import supercell.instrumentos.backend.models.Enums.Roles;

public record UsuarioDTO(
    String nombreUsuario,
    String clave,
    Roles rol
) {}
