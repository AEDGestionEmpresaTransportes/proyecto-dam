package org.example.paqueteriagestion.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "MUNICIPIO")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Municipio {

    @Id
    @Column(name = "Codigo", length = 10)
    private String codigo;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;
}