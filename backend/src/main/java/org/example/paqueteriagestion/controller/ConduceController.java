package org.example.paqueteriagestion.controller;

import org.example.paqueteriagestion.model.Conduce;
import org.example.paqueteriagestion.repository.ConduceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conduces")
public class ConduceController {

    @Autowired
    public ConduceRepository conduceRepository;

    @GetMapping
    public List<Conduce> obtenerConductoresVehiculos(){
        return conduceRepository.findAll();
    }

    @PostMapping
    public Conduce crear(@RequestBody Conduce conduce){
        return conduceRepository.save(conduce);
    }
}
