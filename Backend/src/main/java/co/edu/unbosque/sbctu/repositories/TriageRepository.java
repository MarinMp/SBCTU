package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.Triage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface TriageRepository extends JpaRepository<Triage, Integer> {

    @Query("SELECT DISTINCT t FROM Triage t")
    List<Triage> findAllDistinct();

    // Buscar triages por nivel de urgencia (por ID)
    List<Triage> findByNivelUrgencia_IdNivelUrgencia(Integer idNivelUrgencia);

    // Buscar triages realizados por un médico (por ID)
    List<Triage> findByPersonalMedico_IdPersonal(Integer idPersonalMedico);

    // Buscar triages realizados después de una hora específica
    List<Triage> findByHoraAtencionAfter(LocalTime hora);

    // Buscar triage por ID de visita
    Triage findByVisita_IdVisita(Integer idVisita);
}
