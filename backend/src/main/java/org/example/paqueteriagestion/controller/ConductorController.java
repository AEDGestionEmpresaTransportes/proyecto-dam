package org.example.paqueteriagestion.controller;

import org.example.paqueteriagestion.model.Conductor;
import org.example.paqueteriagestion.repository.ConductorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/conductores")
public class ConductorController {

    @Autowired
    private ConductorRepository conductorRepository;

    // Obtener todos
    @GetMapping
    public List<Conductor> obtenerConductores(){
        return conductorRepository.findAll();
    }

    // Obtener un coductor por DNI
    @GetMapping("/{dni}")
    public Optional<Conductor> obtenerConductorDNI(@PathVariable String dni){
        return conductorRepository.findById(dni);
    }

    // crear conductor
    @PostMapping
    public Conductor crearConductor(@RequestBody Conductor conductor){
        return conductorRepository.save(conductor);
    }

    // Actualizar condcutor
    @PutMapping("/{dni}")
    public Conductor actualizarConductor(@PathVariable String dni, @RequestBody Conductor conductor){
        conductor.setDni(dni);
        return conductorRepository.save(conductor);
    }

    // Eliminar un conductor
    @DeleteMapping("/{dni}")
    public void eliminarConductor(@PathVariable String dni){
        conductorRepository.deleteById(dni);
    }
    
}
