package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.Visita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VisitaRepository extends JpaRepository<Visita, Integer> {

    // Buscar todas las visitas de un paciente por su ID
    List<Visita> findByPaciente_IdPaciente(Integer idPaciente);

    // Buscar visitas por fecha
    List<Visita> findByFechaVisita(LocalDate fechaVisita);

    // Buscar visitas por estado (por ejemplo: "ATENCION", "ALTA", "REMISION")
    List<Visita> findByEstadoVisita(String estadoVisita);
}
