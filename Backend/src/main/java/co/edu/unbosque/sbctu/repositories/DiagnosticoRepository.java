package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosticoRepository extends JpaRepository<Diagnostico, Integer> {

    List<Diagnostico> findByTipoDiagnosticoIgnoreCase(String tipo);

    List<Diagnostico> findByTriage_IdTriage(Integer idTriage);

    List<Diagnostico> findByPersonalMedico_IdPersonal(Integer idMedico);

    List<Diagnostico> findByEnfermedad_IdEnfermedad(Integer idEnfermedad);
}
