package org.example.paqueteriagestion.controller;

import org.example.paqueteriagestion.model.Vehiculo;
import org.example.paqueteriagestion.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    // Obtener todos
    @GetMapping
    public List<Vehiculo> obtenerVehiculos() {
        return vehiculoRepository.findAll();
    }

    // Obtener un vehiculo por Matrícula
    @GetMapping("/{matricula}")
    public Optional<Vehiculo> obtenerVehiculoMatricula(@PathVariable String matricula) {
        return vehiculoRepository.findById(matricula);
    }

    // crear vehiculo
    @PostMapping
    public Vehiculo crearVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    // Actualizar vehiculo
    @PutMapping("/{matricula}")
    public Vehiculo actualizarVehiculo(@PathVariable String matricula, @RequestBody Vehiculo vehiculo) {
        vehiculo.setMatricula(matricula);
        return vehiculoRepository.save(vehiculo);
    }

    // Eliminar un vehiculo
    @DeleteMapping("/{matricula}")
    public void eliminarVehiculo(@PathVariable String matricula) {
        vehiculoRepository.deleteById(matricula);
    }
}
