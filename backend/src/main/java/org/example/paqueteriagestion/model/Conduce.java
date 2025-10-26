package org.example.paqueteriagestion.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "CONDUCE")
@IdClass(ConduceId.class)  // Indica que usa una clave primaria compuesta
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conduce {

    // Parte 1 de la clave primaria compuesta
    @Id
    @ManyToOne
    @JoinColumn(name = "DNI_Conductor", referencedColumnName = "DNI")
    private Conductor conductor;

    // Parte 2 de la clave primaria compuesta
    @Id
    @ManyToOne
    @JoinColumn(name = "Matricula_Vehiculo", referencedColumnName = "Matricula")
    private Vehiculo vehiculo;

    // Parte 3 de la clave primaria compuesta
    @Id
    @Column(name = "Fecha", nullable = false)
    private LocalDate fecha;
}