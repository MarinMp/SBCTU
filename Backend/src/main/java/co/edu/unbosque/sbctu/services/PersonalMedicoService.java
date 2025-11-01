package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.exceptions.ReglaNegocioException;
import co.edu.unbosque.sbctu.model.dtos.PersonalMedicoDTO;
import co.edu.unbosque.sbctu.model.entities.PersonalMedico;
import co.edu.unbosque.sbctu.repositories.PersonalMedicoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonalMedicoService {

    private final PersonalMedicoRepository personalMedicoRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public PersonalMedicoService(PersonalMedicoRepository personalMedicoRepository) {
        this.personalMedicoRepository = personalMedicoRepository;
    }

    // Registrar nuevo personal médico
    public PersonalMedicoDTO registrarPersonal(PersonalMedicoDTO dto) {
        if (personalMedicoRepository.existsByCorreoInstitucional(dto.getCorreoInstitucional())) {
            throw new ReglaNegocioException("Ya existe un usuario con ese correo institucional.");
        }

        PersonalMedico personal = modelMapper.map(dto, PersonalMedico.class);
        PersonalMedico guardado = personalMedicoRepository.save(personal);
        return modelMapper.map(guardado, PersonalMedicoDTO.class);
    }

    // Listar todo el personal médico
    public List<PersonalMedicoDTO> listarPersonal() {
        return personalMedicoRepository.findAll().stream()
                .map(p -> modelMapper.map(p, PersonalMedicoDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public PersonalMedicoDTO obtenerPorId(Integer id) {
        PersonalMedico personal = personalMedicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Personal médico no encontrado."));
        return modelMapper.map(personal, PersonalMedicoDTO.class);
    }

    // Buscar por número de licencia
    public PersonalMedicoDTO obtenerPorLicencia(String numeroLicencia) {
        PersonalMedico personal = personalMedicoRepository.findByNumeroLicencia(numeroLicencia);
        if (personal == null) {
            throw new RecursoNoEncontradoException("No se encontró un médico con esa licencia.");
        }
        return modelMapper.map(personal, PersonalMedicoDTO.class);
    }

    // Actualizar datos de personal médico
    public PersonalMedicoDTO actualizarPersonal(Integer id, PersonalMedicoDTO dto) {
        PersonalMedico existente = personalMedicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Personal médico no encontrado."));

        existente.setPrimerNombre(dto.getPrimerNombre());
        existente.setSegundoNombre(dto.getSegundoNombre());
        existente.setPrimerApellido(dto.getPrimerApellido());
        existente.setSegundoApellido(dto.getSegundoApellido());
        existente.setNumeroLicencia(dto.getNumeroLicencia());
        existente.setCargo(dto.getCargo());
        existente.setCorreoInstitucional(dto.getCorreoInstitucional());

        PersonalMedico actualizado = personalMedicoRepository.save(existente);
        return modelMapper.map(actualizado, PersonalMedicoDTO.class);
    }

    // Eliminar registro
    public void eliminarPersonal(Integer id) {
        PersonalMedico personal = personalMedicoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Personal médico no encontrado."));
        personalMedicoRepository.delete(personal);
    }
}
