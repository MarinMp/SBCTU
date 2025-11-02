package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.exceptions.ReglaNegocioException;
import co.edu.unbosque.sbctu.model.dtos.EnfermedadDTO;
import co.edu.unbosque.sbctu.model.entities.Enfermedad;
import co.edu.unbosque.sbctu.repositories.EnfermedadRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnfermedadService {

    private final EnfermedadRepository enfermedadRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public EnfermedadService(EnfermedadRepository enfermedadRepository) {
        this.enfermedadRepository = enfermedadRepository;

    }

    // Registrar una nueva enfermedad
    public EnfermedadDTO registrarEnfermedad(EnfermedadDTO dto) {
        if (enfermedadRepository.existsByCodigoEnfermedad(dto.getCodigoEnfermedad())) {
            throw new ReglaNegocioException("Ya existe una enfermedad con ese código.");
        }

        Enfermedad enfermedad = modelMapper.map(dto, Enfermedad.class);
        Enfermedad guardada = enfermedadRepository.save(enfermedad);
        return modelMapper.map(guardada, EnfermedadDTO.class);
    }

    // Listar todas las enfermedades
    public List<EnfermedadDTO> listarEnfermedades() {
        return enfermedadRepository.findAll().stream()
                .map(e -> modelMapper.map(e, EnfermedadDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar enfermedad por ID
    public EnfermedadDTO obtenerPorId(Integer id) {
        Enfermedad enfermedad = enfermedadRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermedad no encontrada."));
        return modelMapper.map(enfermedad, EnfermedadDTO.class);
    }

    // Buscar enfermedad por código
    public EnfermedadDTO obtenerPorCodigo(Integer codigo) {
        Enfermedad enfermedad = enfermedadRepository.findByCodigoEnfermedad(codigo);
        if (enfermedad == null) {
            throw new RecursoNoEncontradoException("No se encontró una enfermedad con ese código.");
        }
        return modelMapper.map(enfermedad, EnfermedadDTO.class);
    }

    // Buscar enfermedades por categoría
    public List<EnfermedadDTO> obtenerPorCategoria(String categoria) {
        List<Enfermedad> enfermedades = enfermedadRepository.findByCategoria(categoria);
        if (enfermedades.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron enfermedades en la categoría: " + categoria);
        }
        return enfermedades.stream()
                .map(e -> modelMapper.map(e, EnfermedadDTO.class))
                .collect(Collectors.toList());
    }

    // Actualizar una enfermedad existente
    public EnfermedadDTO actualizarEnfermedad(Integer id, EnfermedadDTO dto) {
        Enfermedad existente = enfermedadRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermedad no encontrada."));

        existente.setNombreEnfermedad(dto.getNombreEnfermedad());
        existente.setDescripcion(dto.getDescripcion());
        existente.setCodigoEnfermedad(dto.getCodigoEnfermedad());
        existente.setTratamiento(dto.getTratamiento());
        existente.setObservaciones(dto.getObservaciones());
        existente.setCategoria(dto.getCategoria());

        Enfermedad actualizada = enfermedadRepository.save(existente);
        return modelMapper.map(actualizada, EnfermedadDTO.class);
    }

    // Eliminar una enfermedad
    public void eliminarEnfermedad(Integer id) {
        Enfermedad enfermedad = enfermedadRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Enfermedad no encontrada."));
        enfermedadRepository.delete(enfermedad);
    }
}
