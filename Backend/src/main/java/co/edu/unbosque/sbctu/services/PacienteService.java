package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.exceptions.ReglaNegocioException;
import co.edu.unbosque.sbctu.model.dtos.PacienteDTO;
import co.edu.unbosque.sbctu.model.entities.Paciente;
import co.edu.unbosque.sbctu.repositories.PacienteRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    // Crear o registrar paciente
    public PacienteDTO registrarPaciente(PacienteDTO dto) {
        if (pacienteRepository.existsByCorreo(dto.getCorreo())) {
            throw new ReglaNegocioException("El correo ya está registrado en otro paciente.");
        }

        Paciente paciente = modelMapper.map(dto, Paciente.class);
        Paciente guardado = pacienteRepository.save(paciente);
        return modelMapper.map(guardado, PacienteDTO.class);
    }

    // Listar todos los pacientes
    public List<PacienteDTO> listarPacientes() {
        return pacienteRepository.findAll().stream()
                .map(p -> modelMapper.map(p, PacienteDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar paciente por ID
    public PacienteDTO obtenerPorId(Integer id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado."));
        return modelMapper.map(paciente, PacienteDTO.class);
    }

    // Actualizar paciente existente
    public PacienteDTO actualizarPaciente(Integer id, PacienteDTO dto) {
        Paciente existente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado."));

        existente.setPrimerNombre(dto.getPrimerNombre());
        existente.setSegundoNombre(dto.getSegundoNombre());
        existente.setPrimerApellido(dto.getPrimerApellido());
        existente.setSegundoApellido(dto.getSegundoApellido());
        existente.setFechaNacimiento(dto.getFechaNacimiento());
        existente.setGenero(dto.getGenero());
        existente.setDireccion(dto.getDireccion());
        existente.setCorreo(dto.getCorreo());

        Paciente actualizado = pacienteRepository.save(existente);
        return modelMapper.map(actualizado, PacienteDTO.class);
    }

    // Eliminar paciente por ID
    public void eliminarPaciente(Integer id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado."));
        pacienteRepository.delete(paciente);
    }
}
