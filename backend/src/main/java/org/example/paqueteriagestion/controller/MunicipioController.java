package org.example.paqueteriagestion.controller;

import org.example.paqueteriagestion.model.Municipio;
import org.example.paqueteriagestion.repository.MunicipioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/municipios")
public class MunicipioController {

    @Autowired
    private MunicipioRepository municipioRepository;

    // Devuelve todos los municipios
    @GetMapping
    public List<Municipio> obtenerMunicipios(){
        return municipioRepository.findAll();
    }

    // Devuelve un solo municipio por su código
    @GetMapping("/{codigo}")
    public Optional<Municipio> obtenerMunicipioCodigo(@PathVariable String codigo){
        return municipioRepository.findById(codigo);
    }

    // Crear Municipio
    @PostMapping
    public Municipio crearMunicipio(@RequestBody Municipio municipio){
        return municipioRepository.save(municipio);
    }

    // Actualizar Municipio
    @PutMapping("/{codigo}")
    public Municipio actualizarMunicipio(@PathVariable String codigo, @RequestBody Municipio municipio){
        municipio.setCodigo(codigo);
        return municipioRepository.save(municipio);
    }

    // Eliminar un municipo
    @DeleteMapping("/{codigo}")
    public void eliminarMunicipio(@PathVariable String codigo){
        municipioRepository.deleteById(codigo);
    }
}
