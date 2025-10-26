package org.example.paqueteriagestion.repository;

import org.example.paqueteriagestion.model.Conductor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConductorRepository extends JpaRepository<Conductor, String> {
}
