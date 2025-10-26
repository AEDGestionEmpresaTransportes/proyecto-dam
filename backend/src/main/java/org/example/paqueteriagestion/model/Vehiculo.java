package org.example.paqueteriagestion.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VEHICULO")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Vehiculo {

    @Id
    @Column(name = "Matricula", length = 15)
    private String matricula;

    @Column(name = "Modelo", length = 50)
    private String modelo;

    @Column(name = "Tipo", length = 30)
    private String tipo;

    @Column(name = "Potencia")
    private int potencia;
}
