package org.example.paqueteriagestion.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PAQUETE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paquete {

    @Id
    @Column(name = "Codigo", length = 20)
    private String codigo;

    @Column(name = "Descripcion", length = 255)
    private String descripcion;

    @Column(name = "Destinatario", length = 100)
    private String destinatario;

    @Column(name = "Direccion", length = 255)
    private String direccion;

    @ManyToOne
    @JoinColumn(name = "Municipio_Destino", nullable = false, referencedColumnName = "Codigo")
    private Municipio municipioDestino;

    @ManyToOne
    @JoinColumn(name = "Conductor_DNI", referencedColumnName = "DNI")
    private Conductor conductor;

}
