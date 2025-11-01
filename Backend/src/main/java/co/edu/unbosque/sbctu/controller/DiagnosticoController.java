package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.DiagnosticoDTO;
import co.edu.unbosque.sbctu.services.DiagnosticoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class DiagnosticoController {

    private final DiagnosticoService diagnosticoService;

    public DiagnosticoController(DiagnosticoService diagnosticoService) {
        this.diagnosticoService = diagnosticoService;
    }

    // Registrar un nuevo diagnóstico
    @PostMapping("/diagnosticos")
    public ResponseEntity<DiagnosticoDTO> registrarDiagnostico(@RequestBody DiagnosticoDTO dto) {
        System.out.println("Registrando nuevo diagnóstico...");
        DiagnosticoDTO nuevo = diagnosticoService.registrarDiagnostico(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todos los diagnósticos
    @GetMapping("/diagnosticos")
    public ResponseEntity<List<DiagnosticoDTO>> listarDiagnosticos() {
        System.out.println("Listando todos los diagnósticos...");
        return new ResponseEntity<>(diagnosticoService.listarDiagnosticos(), HttpStatus.OK);
    }

    // Buscar diagnóstico por ID
    @GetMapping("/diagnosticos/{id}")
    public ResponseEntity<DiagnosticoDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando diagnóstico con ID: " + id);
        return new ResponseEntity<>(diagnosticoService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar diagnósticos por tipo (PRELIMINAR o CONFIRMADO)
    @GetMapping("/diagnosticos/tipo/{tipo}")
    public ResponseEntity<List<DiagnosticoDTO>> buscarPorTipo(@PathVariable String tipo) {
        System.out.println("Buscando diagnósticos del tipo: " + tipo);
        return new ResponseEntity<>(diagnosticoService.listarPorTipo(tipo), HttpStatus.OK);
    }

    // Buscar diagnósticos asociados a un triage
    @GetMapping("/diagnosticos/triage/{idTriage}")
    public ResponseEntity<List<DiagnosticoDTO>> buscarPorTriage(@PathVariable Integer idTriage) {
        System.out.println("Buscando diagnósticos asociados al triage con ID: " + idTriage);
        return new ResponseEntity<>(diagnosticoService.listarPorTriage(idTriage), HttpStatus.OK);
    }

    // Buscar diagnósticos por médico
    @GetMapping("/diagnosticos/medico/{idMedico}")
    public ResponseEntity<List<DiagnosticoDTO>> buscarPorMedico(@PathVariable Integer idMedico) {
        System.out.println("Buscando diagnósticos realizados por el médico con ID: " + idMedico);
        return new ResponseEntity<>(diagnosticoService.listarPorMedico(idMedico), HttpStatus.OK);
    }

    // Buscar diagnósticos por enfermedad
    @GetMapping("/diagnosticos/enfermedad/{idEnfermedad}")
    public ResponseEntity<List<DiagnosticoDTO>> buscarPorEnfermedad(@PathVariable Integer idEnfermedad) {
        System.out.println("Buscando diagnósticos de la enfermedad con ID: " + idEnfermedad);
        return new ResponseEntity<>(diagnosticoService.listarPorEnfermedad(idEnfermedad), HttpStatus.OK);
    }

    // Actualizar diagnóstico
    @PutMapping("/diagnosticos/{id}")
    public ResponseEntity<DiagnosticoDTO> actualizarDiagnostico(@PathVariable Integer id, @RequestBody DiagnosticoDTO dto) {
        System.out.println("Actualizando diagnóstico con ID: " + id);
        DiagnosticoDTO actualizado = diagnosticoService.actualizarDiagnostico(id, dto);
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }

    // Eliminar diagnóstico
    @DeleteMapping("/diagnosticos/{id}")
    public ResponseEntity<Void> eliminarDiagnostico(@PathVariable Integer id) {
        System.out.println("Eliminando diagnóstico con ID: " + id);
        diagnosticoService.eliminarDiagnostico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
