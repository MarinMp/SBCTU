package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.model.dtos.DiagnosticoDTO;
import co.edu.unbosque.sbctu.model.entities.*;
import co.edu.unbosque.sbctu.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DiagnosticoService {

    private final DiagnosticoRepository diagnosticoRepository;
    private final EnfermedadRepository enfermedadRepository;
    private final TriageRepository triageRepository;
    private final PersonalMedicoRepository personalMedicoRepository;
    private final NivelUrgenciaRepository nivelUrgenciaRepository;

    private final ModelMapper modelMapper = new ModelMapper();

    public DiagnosticoService(DiagnosticoRepository diagnosticoRepository,
                              EnfermedadRepository enfermedadRepository,
                              TriageRepository triageRepository,
                              PersonalMedicoRepository personalMedicoRepository,
                              NivelUrgenciaRepository nivelUrgenciaRepository) {
        this.diagnosticoRepository = diagnosticoRepository;
        this.enfermedadRepository = enfermedadRepository;
        this.triageRepository = triageRepository;
        this.personalMedicoRepository = personalMedicoRepository;
        this.nivelUrgenciaRepository = nivelUrgenciaRepository;
    }

    // Registrar diagnóstico
    public DiagnosticoDTO registrarDiagnostico(DiagnosticoDTO dto) {
        Enfermedad enfermedad = enfermedadRepository.findById(dto.getIdEnfermedad())
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermedad no encontrada."));
        Triage triage = triageRepository.findById(dto.getIdTriage())
                .orElseThrow(() -> new RecursoNoEncontradoException("Triage no encontrado."));
        PersonalMedico medico = personalMedicoRepository.findById(dto.getIdPersonalMedico())
                .orElseThrow(() -> new RecursoNoEncontradoException("Personal médico no encontrado."));
        NivelUrgencia nivel = nivelUrgenciaRepository.findById(dto.getIdNivelUrgencia())
                .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));

        Diagnostico diagnostico = modelMapper.map(dto, Diagnostico.class);
        diagnostico.setEnfermedad(enfermedad);
        diagnostico.setTriage(triage);
        diagnostico.setPersonalMedico(medico);
        diagnostico.setNivelUrgencia(nivel);

        Diagnostico guardado = diagnosticoRepository.save(diagnostico);
        return toDTO(guardado);
    }

    // Listar todos
    public List<DiagnosticoDTO> listarDiagnosticos() {
        return diagnosticoRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Buscar por ID
    public DiagnosticoDTO obtenerPorId(Integer id) {
        Diagnostico diagnostico = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Diagnóstico no encontrado."));
        return toDTO(diagnostico);
    }

    // Buscar por tipo de diagnóstico
    public List<DiagnosticoDTO> listarPorTipo(String tipo) {
        List<Diagnostico> diagnosticos = diagnosticoRepository.findByTipoDiagnosticoIgnoreCase(tipo);
        if (diagnosticos.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron diagnósticos de tipo " + tipo);
        }
        return diagnosticos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Buscar por triage
    public List<DiagnosticoDTO> listarPorTriage(Integer idTriage) {
        List<Diagnostico> diagnosticos = diagnosticoRepository.findByTriage_IdTriage(idTriage);
        if (diagnosticos.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron diagnósticos para el triage especificado.");
        }
        return diagnosticos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Buscar por médico
    public List<DiagnosticoDTO> listarPorMedico(Integer idMedico) {
        List<Diagnostico> diagnosticos = diagnosticoRepository.findByPersonalMedico_IdPersonal(idMedico);
        if (diagnosticos.isEmpty()) {
            throw new RecursoNoEncontradoException("El médico no tiene diagnósticos registrados.");
        }
        return diagnosticos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Buscar por enfermedad
    public List<DiagnosticoDTO> listarPorEnfermedad(Integer idEnfermedad) {
        List<Diagnostico> diagnosticos = diagnosticoRepository.findByEnfermedad_IdEnfermedad(idEnfermedad);
        if (diagnosticos.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron diagnósticos para la enfermedad indicada.");
        }
        return diagnosticos.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Actualizar diagnóstico
    public DiagnosticoDTO actualizarDiagnostico(Integer id, DiagnosticoDTO dto) {
        Diagnostico existente = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Diagnóstico no encontrado."));

        if (dto.getTipoDiagnostico() != null)
            existente.setTipoDiagnostico(dto.getTipoDiagnostico());

        if (dto.getObservaciones() != null)
            existente.setObservaciones(dto.getObservaciones());

        if (dto.getIdNivelUrgencia() != null) {
            NivelUrgencia nivel = nivelUrgenciaRepository.findById(dto.getIdNivelUrgencia())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));
            existente.setNivelUrgencia(nivel);
        }

        Diagnostico actualizado = diagnosticoRepository.save(existente);
        return toDTO(actualizado);
    }

    // Eliminar diagnóstico
    public void eliminarDiagnostico(Integer id) {
        Diagnostico diagnostico = diagnosticoRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Diagnóstico no encontrado."));
        diagnosticoRepository.delete(diagnostico);
    }

    // --- Mapper ---
    private DiagnosticoDTO toDTO(Diagnostico d) {
        DiagnosticoDTO dto = new DiagnosticoDTO();
        dto.setIdDiagnostico(d.getIdDiagnostico());
        dto.setFechaDiagnostico(d.getFechaDiagnostico());
        dto.setTipoDiagnostico(d.getTipoDiagnostico());
        dto.setObservaciones(d.getObservaciones());
        if (d.getEnfermedad() != null) dto.setIdEnfermedad(d.getEnfermedad().getIdEnfermedad());
        if (d.getTriage() != null) dto.setIdTriage(d.getTriage().getIdTriage());
        if (d.getPersonalMedico() != null) dto.setIdPersonalMedico(d.getPersonalMedico().getIdPersonal());
        if (d.getNivelUrgencia() != null) dto.setIdNivelUrgencia(d.getNivelUrgencia().getIdNivelUrgencia());
        return dto;
    }
}
