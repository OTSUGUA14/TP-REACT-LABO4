package supercell.instrumentos.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Instrumento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    
    private String instrumento;
    private String marca;
    private String modelo;
    private String imagen;
    private double precio;
    @Column(name = "costo_envio")
    private String costoEnvio; // CostoEnvio es un String porque puede ser un numero o 'G'
    @Column(name = "cantidad_vendida")
    private int cantidadVendida;
    @Column(columnDefinition = "varchar(600)")
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "id_categoria", nullable = false)
    private CategoriaInstrumento idCategoria;
}
