package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.model.dtos.VisitaDTO;
import co.edu.unbosque.sbctu.model.entities.Paciente;
import co.edu.unbosque.sbctu.model.entities.Visita;
import co.edu.unbosque.sbctu.repositories.PacienteRepository;
import co.edu.unbosque.sbctu.repositories.VisitaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VisitaService {

    private final VisitaRepository visitaRepository;
    private final PacienteRepository pacienteRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public VisitaService(VisitaRepository visitaRepository, PacienteRepository pacienteRepository) {
        this.visitaRepository = visitaRepository;
        this.pacienteRepository = pacienteRepository;
    }

    // Registrar nueva visita
    public VisitaDTO registrarVisita(VisitaDTO dto) {
        Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado."));

        Visita visita = modelMapper.map(dto, Visita.class);
        visita.setPaciente(paciente);

        Visita guardada = visitaRepository.save(visita);
        return modelMapper.map(guardada, VisitaDTO.class);
    }

    // Listar todas las visitas
    public List<VisitaDTO> listarVisitas() {
        return visitaRepository.findAll().stream()
                .map(v -> modelMapper.map(v, VisitaDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar visitas por ID
    public VisitaDTO obtenerPorId(Integer id) {
        Visita visita = visitaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Visita no encontrada."));
        return modelMapper.map(visita, VisitaDTO.class);
    }

    // Buscar todas las visitas de un paciente
    public List<VisitaDTO> listarPorPaciente(Integer idPaciente) {
        List<Visita> visitas = visitaRepository.findByPaciente_IdPaciente(idPaciente);
        if (visitas.isEmpty()) {
            throw new RecursoNoEncontradoException("El paciente no tiene visitas registradas.");
        }
        return visitas.stream()
                .map(v -> modelMapper.map(v, VisitaDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar visitas por estado (ATENCION, ALTA, etc.)
    public List<VisitaDTO> listarPorEstado(String estado) {
        List<Visita> visitas = visitaRepository.findByEstadoVisita(estado);
        if (visitas.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron visitas con estado: " + estado);
        }
        return visitas.stream()
                .map(v -> modelMapper.map(v, VisitaDTO.class))
                .collect(Collectors.toList());
    }

    // Actualizar datos de una visita
    public VisitaDTO actualizarVisita(Integer id, VisitaDTO dto) {
        Visita existente = visitaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Visita no encontrada."));

        if (dto.getFechaVisita() != null) {
            existente.setFechaVisita(dto.getFechaVisita());
        }

        if (dto.getHoraVisita() != null) {
            existente.setHoraVisita(dto.getHoraVisita());
        }

        if (dto.getMotivoConsulta() != null) {
            existente.setMotivoConsulta(dto.getMotivoConsulta());
        }

        if (dto.getEstadoVisita() != null) {
            existente.setEstadoVisita(dto.getEstadoVisita());
        }

        if (dto.getIdPaciente() != null) {
            Paciente paciente = pacienteRepository.findById(dto.getIdPaciente())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Paciente no encontrado."));
            existente.setPaciente(paciente);
        }

        Visita actualizada = visitaRepository.save(existente);
        return modelMapper.map(actualizada, VisitaDTO.class);
    }

    // Eliminar una visita
    public void eliminarVisita(Integer id) {
        Visita visita = visitaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Visita no encontrada."));
        visitaRepository.delete(visita);
    }
}
