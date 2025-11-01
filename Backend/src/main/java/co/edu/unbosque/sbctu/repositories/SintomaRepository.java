package co.edu.unbosque.sbctu.model.repositories;

import co.edu.unbosque.sbctu.model.entities.Sintoma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SintomaRepository extends JpaRepository<Sintoma, Integer> {

    // Buscar un síntoma por su nombre exacto
    Sintoma findByNombreSintoma(String nombreSintoma);

    // Buscar síntomas que contengan parte del nombre
    List<Sintoma> findByNombreSintomaContainingIgnoreCase(String nombreParcial);

    // Verificar si un síntoma ya existe
    boolean existsByNombreSintoma(String nombreSintoma);
}
