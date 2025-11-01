package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.PacienteDTO;
import co.edu.unbosque.sbctu.services.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    // Registrar un nuevo paciente
    @PostMapping("/pacientes")
    public ResponseEntity<PacienteDTO> registrarPaciente(@RequestBody PacienteDTO dto) {
        System.out.println("Registrando nuevo paciente...");
        PacienteDTO nuevo = pacienteService.registrarPaciente(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todos los pacientes
    @GetMapping("/pacientes")
    public ResponseEntity<List<PacienteDTO>> listarPacientes() {
        System.out.println("Listando todos los pacientes...");
        return new ResponseEntity<>(pacienteService.listarPacientes(), HttpStatus.OK);
    }

    // Buscar paciente por ID
    @GetMapping("/pacientes/{id}")
    public ResponseEntity<PacienteDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando paciente con ID: " + id);
        return new ResponseEntity<>(pacienteService.obtenerPorId(id), HttpStatus.OK);
    }

    // Actualizar información del paciente
    @PutMapping("/pacientes/{id}")
    public ResponseEntity<PacienteDTO> actualizarPaciente(@PathVariable Integer id, @RequestBody PacienteDTO dto) {
        System.out.println("Actualizando paciente con ID: " + id);
        return new ResponseEntity<>(pacienteService.actualizarPaciente(id, dto), HttpStatus.OK);
    }

    // Eliminar paciente
    @DeleteMapping("/pacientes/{id}")
    public ResponseEntity<Void> eliminarPaciente(@PathVariable Integer id) {
        System.out.println("Eliminando paciente con ID: " + id);
        pacienteService.eliminarPaciente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
