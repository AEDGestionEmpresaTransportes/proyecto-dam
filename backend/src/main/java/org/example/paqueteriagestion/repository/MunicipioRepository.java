package org.example.paqueteriagestion.repository;

import org.example.paqueteriagestion.model.Municipio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MunicipioRepository extends JpaRepository<Municipio, String> {
}
