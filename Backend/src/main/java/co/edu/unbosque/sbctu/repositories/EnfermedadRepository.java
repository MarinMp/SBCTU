package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.Enfermedad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnfermedadRepository extends JpaRepository<Enfermedad, Integer> {

    // Buscar una enfermedad por su código único
    Enfermedad findByCodigoEnfermedad(Integer codigoEnfermedad);

    // Buscar enfermedades por categoría (por ejemplo: respiratoria, infecciosa, etc.)
    List<Enfermedad> findByCategoria(String categoria);

    // Verificar si ya existe una enfermedad con ese código
    boolean existsByCodigoEnfermedad(Integer codigoEnfermedad);
}
