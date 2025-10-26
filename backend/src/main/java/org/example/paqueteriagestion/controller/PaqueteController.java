package org.example.paqueteriagestion.controller;

import org.example.paqueteriagestion.model.Paquete;
import org.example.paqueteriagestion.repository.PaqueteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/paquetes")
public class PaqueteController {

    @Autowired
    private PaqueteRepository paqueteRepository;

    // Obtener todos
    @GetMapping
    public List<Paquete> obtenerPaquetes() {
        return paqueteRepository.findAll();
    }

    // Obtener un paquete por Código
    @GetMapping("/{codigo}")
    public Optional<Paquete> obtenerPaqueteCodigo(@PathVariable String codigo) {
        return paqueteRepository.findById(codigo);
    }

    // crear paquete
    @PostMapping
    public Paquete crearPaquete(@RequestBody Paquete paquete) {
        return paqueteRepository.save(paquete);
    }

    // Actualizar paquete
    @PutMapping("/{codigo}")
    public Paquete actualizarPaquete(@PathVariable String codigo, @RequestBody Paquete paquete) {
        paquete.setCodigo(codigo);
        return paqueteRepository.save(paquete);
    }

    // Eliminar un paquete
    @DeleteMapping("/{codigo}")
    public void eliminarPaquete(@PathVariable String codigo) {
        paqueteRepository.deleteById(codigo);
    }
}
