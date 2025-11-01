package co.edu.unbosque.sbctu.services;

import co.edu.unbosque.sbctu.exceptions.RecursoNoEncontradoException;
import co.edu.unbosque.sbctu.exceptions.ReglaNegocioException;
import co.edu.unbosque.sbctu.model.dtos.SintomaDTO;
import co.edu.unbosque.sbctu.model.entities.Sintoma;
import co.edu.unbosque.sbctu.model.repositories.SintomaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SintomaService {

    private final SintomaRepository sintomaRepository;
    private final ModelMapper modelMapper = new ModelMapper();

    public SintomaService(SintomaRepository sintomaRepository) {
        this.sintomaRepository = sintomaRepository;
    }

    // Registrar nuevo síntoma
    public SintomaDTO registrarSintoma(SintomaDTO dto) {
        if (sintomaRepository.existsByNombreSintoma(dto.getNombreSintoma())) {
            throw new ReglaNegocioException("Ya existe un síntoma con ese nombre.");
        }

        Sintoma sintoma = modelMapper.map(dto, Sintoma.class);
        Sintoma guardado = sintomaRepository.save(sintoma);
        return modelMapper.map(guardado, SintomaDTO.class);
    }

    // Listar todos los síntomas
    public List<SintomaDTO> listarSintomas() {
        return sintomaRepository.findAll().stream()
                .map(s -> modelMapper.map(s, SintomaDTO.class))
                .collect(Collectors.toList());
    }

    // Buscar síntoma por ID
    public SintomaDTO obtenerPorId(Integer id) {
        Sintoma sintoma = sintomaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Síntoma no encontrado."));
        return modelMapper.map(sintoma, SintomaDTO.class);
    }

    // Buscar por nombre exacto
    public SintomaDTO obtenerPorNombre(String nombre) {
        Sintoma sintoma = sintomaRepository.findByNombreSintoma(nombre);
        if (sintoma == null) {
            throw new RecursoNoEncontradoException("No se encontró un síntoma con ese nombre.");
        }
        return modelMapper.map(sintoma, SintomaDTO.class);
    }

    // Buscar por coincidencia parcial (por ejemplo: "dolor")
    public List<SintomaDTO> buscarPorPalabraClave(String palabra) {
        List<Sintoma> sintomas = sintomaRepository.findByNombreSintomaContainingIgnoreCase(palabra);
        if (sintomas.isEmpty()) {
            throw new RecursoNoEncontradoException("No se encontraron síntomas relacionados con: " + palabra);
        }
        return sintomas.stream()
                .map(s -> modelMapper.map(s, SintomaDTO.class))
                .collect(Collectors.toList());
    }

    // Actualizar un síntoma
    public SintomaDTO actualizarSintoma(Integer id, SintomaDTO dto) {
        Sintoma existente = sintomaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Síntoma no encontrado."));

        existente.setNombreSintoma(dto.getNombreSintoma());
        existente.setDescripcion(dto.getDescripcion());

        Sintoma actualizado = sintomaRepository.save(existente);
        return modelMapper.map(actualizado, SintomaDTO.class);
    }

    // Eliminar síntoma
    public void eliminarSintoma(Integer id) {
        Sintoma sintoma = sintomaRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Síntoma no encontrado."));
        sintomaRepository.delete(sintoma);
    }
}
