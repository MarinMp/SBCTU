package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.NivelUrgencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NivelUrgenciaRepository extends JpaRepository<NivelUrgencia, Integer> {

    // Buscar un nivel de urgencia por su código
    NivelUrgencia findByCodigoNivel(Integer codigoNivel);

    // Verificar si ya existe un nivel con ese código
    boolean existsByCodigoNivel(Integer codigoNivel);
}
