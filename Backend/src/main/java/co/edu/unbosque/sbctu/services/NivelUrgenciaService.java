package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.exceptions.ReglaNegocioException;
import co.edu.unbosque.sbctu.model.dtos.NivelUrgenciaDTO;
import co.edu.unbosque.sbctu.model.entities.NivelUrgencia;
import co.edu.unbosque.sbctu.repositories.NivelUrgenciaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NivelUrgenciaService {

    private final NivelUrgenciaRepository nivelUrgenciaRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public NivelUrgenciaService(NivelUrgenciaRepository nivelUrgenciaRepository) {
        this.nivelUrgenciaRepository = nivelUrgenciaRepository;
    }

    // Registrar un nuevo nivel de urgencia
    public NivelUrgenciaDTO registrarNivel(NivelUrgenciaDTO dto) {
        if (nivelUrgenciaRepository.existsByCodigoNivel(dto.getCodigoNivel())) {
            throw new ReglaNegocioException("Ya existe un nivel de urgencia con ese código.");
        }

        NivelUrgencia nivel = modelMapper.map(dto, NivelUrgencia.class);
        NivelUrgencia guardado = nivelUrgenciaRepository.save(nivel);
        return modelMapper.map(guardado, NivelUrgenciaDTO.class);
    }

    // Listar todos los niveles de urgencia
    public List<NivelUrgenciaDTO> listarNiveles() {
        return nivelUrgenciaRepository.findAll().stream()
                .map(n -> modelMapper.map(n, NivelUrgenciaDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar un nivel de urgencia por ID
    public NivelUrgenciaDTO obtenerPorId(Integer id) {
        NivelUrgencia nivel = nivelUrgenciaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));
        return modelMapper.map(nivel, NivelUrgenciaDTO.class);
    }

    // Buscar un nivel de urgencia por su código
    public NivelUrgenciaDTO obtenerPorCodigo(Integer codigo) {
        NivelUrgencia nivel = nivelUrgenciaRepository.findByCodigoNivel(codigo);
        if (nivel == null) {
            throw new RecursoNoEncontradoException("No se encontró un nivel de urgencia con ese código.");
        }
        return modelMapper.map(nivel, NivelUrgenciaDTO.class);
    }

    // Actualizar un nivel de urgencia
    public NivelUrgenciaDTO actualizarNivel(Integer id, NivelUrgenciaDTO dto) {
        NivelUrgencia existente = nivelUrgenciaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));

        existente.setCodigoNivel(dto.getCodigoNivel());
        existente.setDescripcion(dto.getDescripcion());

        NivelUrgencia actualizado = nivelUrgenciaRepository.save(existente);
        return modelMapper.map(actualizado, NivelUrgenciaDTO.class);
    }

    // Eliminar un nivel de urgencia
    public void eliminarNivel(Integer id) {
        NivelUrgencia nivel = nivelUrgenciaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Nivel de urgencia no encontrado."));
        nivelUrgenciaRepository.delete(nivel);
    }
}
