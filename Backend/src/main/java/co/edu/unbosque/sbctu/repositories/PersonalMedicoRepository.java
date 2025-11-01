package co.edu.unbosque.sbctu.repositories;

import co.edu.unbosque.sbctu.model.entities.PersonalMedico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalMedicoRepository extends JpaRepository<PersonalMedico, Integer> {

    // Buscar personal médico por número de licencia
    PersonalMedico findByNumeroLicencia(String numeroLicencia);

    // Buscar personal médico por correo institucional
    PersonalMedico findByCorreoInstitucional(String correoInstitucional);

    // Verificar si ya existe un registro con ese correo
    boolean existsByCorreoInstitucional(String correoInstitucional);
}
