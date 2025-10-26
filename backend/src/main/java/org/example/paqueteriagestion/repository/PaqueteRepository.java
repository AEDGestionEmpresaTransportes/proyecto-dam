package org.example.paqueteriagestion.repository;

import org.example.paqueteriagestion.model.Paquete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaqueteRepository extends JpaRepository<Paquete, String> {
}
