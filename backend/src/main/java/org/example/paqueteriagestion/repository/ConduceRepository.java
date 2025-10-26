package org.example.paqueteriagestion.repository;

import org.example.paqueteriagestion.model.Conduce;
import org.example.paqueteriagestion.model.ConduceId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConduceRepository extends JpaRepository<Conduce, ConduceId> {
}
