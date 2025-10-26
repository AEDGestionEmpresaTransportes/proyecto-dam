package org.example.paqueteriagestion.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConduceId implements Serializable {

    private String conductor;  // DNI del conductor
    private String vehiculo;   // Matrícula del vehículo
    private LocalDate fecha;

    // Necesario para que funcione como clave primaria compuesta
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ConduceId conduceId = (ConduceId) o;
        return Objects.equals(conductor, conduceId.conductor) &&
                Objects.equals(vehiculo, conduceId.vehiculo) &&
                Objects.equals(fecha, conduceId.fecha);
    }

    @Override
    public int hashCode() {
        return Objects.hash(conductor, vehiculo, fecha);
    }
}