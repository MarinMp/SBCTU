package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.model.dtos.TriageDTO;
import co.edu.unbosque.sbctu.model.entities.*;
import co.edu.unbosque.sbctu.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TriageService {

    private final TriageRepository triageRepository;
    private final VisitaRepository visitaRepository;
    private final PersonalMedicoRepository personalMedicoRepository;
    private final NivelUrgenciaRepository nivelUrgenciaRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public TriageService(TriageRepository triageRepository,
                         VisitaRepository visitaRepository,
                         PersonalMedicoRepository personalMedicoRepository,
                         NivelUrgenciaRepository nivelUrgenciaRepository) {
        this.triageRepository = triageRepository;
        this.visitaRepository = visitaRepository;
        this.personalMedicoRepository = personalMedicoRepository;
        this.nivelUrgenciaRepository = nivelUrgenciaRepository;
    }

    // Registrar un nuevo triage
    public TriageDTO registrarTriage(TriageDTO dto) {
        Visita visita = visitaRepository.findById(dto.getIdVisita())
                .orElseThrow(() -> new RecursoNoEncontradoException("Visita no encontrada."));
        PersonalMedico medico = personalMedicoRepository.findById(dto.getIdPersonalMedico())
                .orElseThrow(() -> new RecursoNoEncontradoException("Personal médico no encontrado."));
        NivelUrgencia nivel = nivelUrgenciaRepository.findById(dto.getIdNivelUrgencia())
                .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));

        Triage triage = modelMapper.map(dto, Triage.class);
        triage.setVisita(visita);
        triage.setPersonalMedico(medico);
        triage.setNivelUrgencia(nivel);

        Triage guardado = triageRepository.save(triage);
        return modelMapper.map(guardado, TriageDTO.class);
    }

    // Listar todos los triages
    public List<TriageDTO> listarTriages() {
        List<Triage> triages = triageRepository.findAllDistinct();
        return triages.stream()
                .map(t -> modelMapper.map(t, TriageDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar triage por ID
    public TriageDTO obtenerPorId(Integer id) {
        Triage triage = triageRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Triage no encontrado."));
        return toDTO(triage);
    }

    // Buscar triages por nivel de urgencia
    public List<TriageDTO> listarPorNivel(Integer idNivel) {
        List<Triage> triages = triageRepository.findByNivelUrgencia_IdNivelUrgencia(idNivel);

        // En lugar de lanzar error, devolvemos lista vacía
        return triages.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Buscar triages por médico
    public List<TriageDTO> listarPorMedico(Integer idMedico) {
        List<Triage> triages = triageRepository.findByPersonalMedico_IdPersonal(idMedico);
        if (triages.isEmpty()) {
            throw new RecursoNoEncontradoException("El médico no tiene triages registrados.");
        }
        return triages.stream().map(this::toDTO).collect(Collectors.toList());
    }

    // Actualizar triage
    public TriageDTO actualizarTriage(Integer id, TriageDTO dto) {
        Triage existente = triageRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Triage no encontrado."));

        existente.setObservaciones(dto.getObservaciones());
        existente.setConstantesVitales(dto.getConstantesVitales());
        existente.setHoraAtencion(dto.getHoraAtencion());

        if (dto.getIdNivelUrgencia() != null) {
            NivelUrgencia nivel = nivelUrgenciaRepository.findById(dto.getIdNivelUrgencia())
                    .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));
            existente.setNivelUrgencia(nivel);
        }

        Triage actualizado = triageRepository.save(existente);
        return toDTO(actualizado);
    }

    // Eliminar triage (versión segura)
    public void eliminarTriage(Integer id) {
        Triage triage = triageRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Triage no encontrado."));

        if (triage.getDiagnosticos() != null && !triage.getDiagnosticos().isEmpty()) {
            triage.getDiagnosticos().forEach(d -> d.setTriage(null));
            triage.getDiagnosticos().clear();
        }

        if (triage.getTriageSintomas() != null && !triage.getTriageSintomas().isEmpty()) {
            triage.getTriageSintomas().forEach(ts -> ts.setTriage(null));
            triage.getTriageSintomas().clear();
        }

        if (triage.getVisita() != null) {
            triage.getVisita().setTriage(null);
        }

        triageRepository.delete(triage);
    }

    // --- Mapper manual para evitar LazyInitialization ---
    private TriageDTO toDTO(Triage t) {
        TriageDTO dto = new TriageDTO();
        dto.setIdTriage(t.getIdTriage());
        dto.setObservaciones(t.getObservaciones());
        dto.setConstantesVitales(t.getConstantesVitales());
        dto.setHoraAtencion(t.getHoraAtencion());
        if (t.getVisita() != null) dto.setIdVisita(t.getVisita().getIdVisita());
        if (t.getPersonalMedico() != null) dto.setIdPersonalMedico(t.getPersonalMedico().getIdPersonal());
        if (t.getNivelUrgencia() != null) dto.setIdNivelUrgencia(t.getNivelUrgencia().getIdNivelUrgencia());
        return dto;
    }
}
