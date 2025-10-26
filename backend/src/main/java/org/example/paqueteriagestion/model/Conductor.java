package org.example.paqueteriagestion.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "VEHICULO")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Conductor {

    @Id
    @Column(name = "DNI", length = 20)
    private String dni;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "Telefono", length = 20)
    private String telefono;

    @Column(name = "Direccion", length = 255)
    private String direccion;

    @Column(name = "Salario", precision = 10, scale = 2)
    private BigDecimal salario;

    @ManyToOne
    @JoinColumn(name = "Municipio", referencedColumnName = "Codigo")
    private Municipio municipio;

}
