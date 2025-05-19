package supercell.instrumentos.backend.models;

public class VerificacionResponse {
    private boolean valido;
    private String rol;

    public VerificacionResponse(boolean valido, String rol) {
        this.valido = valido;
        this.rol = rol;
    }

    public boolean isValido() {
        return valido;
    }

    public String getRol() {
        return rol;
    }

    public void setValido(boolean valido) {
        this.valido = valido;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
