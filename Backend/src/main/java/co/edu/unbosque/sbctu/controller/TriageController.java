package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.TriageDTO;
import co.edu.unbosque.sbctu.services.TriageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class TriageController {

    private final TriageService triageService;

    public TriageController(TriageService triageService) {
        this.triageService = triageService;
    }

    // Registrar un nuevo triage
    @PostMapping("/triages")
    public ResponseEntity<TriageDTO> registrarTriage(@RequestBody TriageDTO dto) {
        System.out.println("Registrando nuevo triage...");
        TriageDTO nuevo = triageService.registrarTriage(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todos los triages
    @GetMapping("/triages")
    public ResponseEntity<List<TriageDTO>> listarTriages() {
        System.out.println("Listando todos los triages...");
        return new ResponseEntity<>(triageService.listarTriages(), HttpStatus.OK);
    }

    // Buscar triage por ID
    @GetMapping("/triages/{id}")
    public ResponseEntity<TriageDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando triage con ID: " + id);
        return new ResponseEntity<>(triageService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar triages por nivel de urgencia
    @GetMapping("/triages/nivel/{idNivel}")
    public ResponseEntity<List<TriageDTO>> buscarPorNivel(@PathVariable Integer idNivel) {
        System.out.println("Buscando triages con nivel de urgencia ID: " + idNivel);
        return new ResponseEntity<>(triageService.listarPorNivel(idNivel), HttpStatus.OK);
    }

    // Buscar triages realizados por un médico
    @GetMapping("/triages/medico/{idMedico}")
    public ResponseEntity<List<TriageDTO>> buscarPorMedico(@PathVariable Integer idMedico) {
        System.out.println("Buscando triages realizados por el médico con ID: " + idMedico);
        return new ResponseEntity<>(triageService.listarPorMedico(idMedico), HttpStatus.OK);
    }

    // Actualizar triage
    @PutMapping("/triages/{id}")
    public ResponseEntity<TriageDTO> actualizarTriage(@PathVariable Integer id, @RequestBody TriageDTO dto) {
        System.out.println("Actualizando triage con ID: " + id);
        TriageDTO actualizado = triageService.actualizarTriage(id, dto);
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }

    // Eliminar triage
    @DeleteMapping("/triages/{id}")
    public ResponseEntity<Void> eliminarTriage(@PathVariable Integer id) {
        System.out.println("Eliminando triage con ID: " + id);
        triageService.eliminarTriage(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
