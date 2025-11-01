package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

    // Busca un paciente por su correo electrónico
    Paciente findByCorreo(String correo);

    // Verifica si ya existe un paciente con ese correo
    boolean existsByCorreo(String correo);
}
