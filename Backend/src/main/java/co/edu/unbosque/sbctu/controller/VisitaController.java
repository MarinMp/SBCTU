package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.VisitaDTO;
import co.edu.unbosque.sbctu.services.VisitaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class VisitaController {

    private final VisitaService visitaService;

    public VisitaController(VisitaService visitaService) {
        this.visitaService = visitaService;
    }

    // Registrar una nueva visita
    @PostMapping("/visitas")
    public ResponseEntity<VisitaDTO> registrarVisita(@RequestBody VisitaDTO dto) {
        System.out.println("Registrando nueva visita...");
        VisitaDTO nueva = visitaService.registrarVisita(dto);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    // Listar todas las visitas
    @GetMapping("/visitas")
    public ResponseEntity<List<VisitaDTO>> listarVisitas() {
        System.out.println("Listando todas las visitas...");
        return new ResponseEntity<>(visitaService.listarVisitas(), HttpStatus.OK);
    }

    // Buscar visita por ID
    @GetMapping("/visitas/{id}")
    public ResponseEntity<VisitaDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando visita con ID: " + id);
        return new ResponseEntity<>(visitaService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar todas las visitas de un paciente
    @GetMapping("/visitas/paciente/{idPaciente}")
    public ResponseEntity<List<VisitaDTO>> buscarPorPaciente(@PathVariable Integer idPaciente) {
        System.out.println("Buscando visitas del paciente con ID: " + idPaciente);
        return new ResponseEntity<>(visitaService.listarPorPaciente(idPaciente), HttpStatus.OK);
    }

    // Buscar visitas por estado (ATENCION, ALTA, etc.)
    @GetMapping("/visitas/estado/{estado}")
    public ResponseEntity<List<VisitaDTO>> buscarPorEstado(@PathVariable String estado) {
        System.out.println("Buscando visitas con estado: " + estado);
        return new ResponseEntity<>(visitaService.listarPorEstado(estado), HttpStatus.OK);
    }

    // Actualizar una visita existente
    @PutMapping("/visitas/{id}")
    public ResponseEntity<VisitaDTO> actualizarVisita(@PathVariable Integer id, @RequestBody VisitaDTO dto) {
        System.out.println("Actualizando visita con ID: " + id);
        VisitaDTO actualizada = visitaService.actualizarVisita(id, dto);
        return new ResponseEntity<>(actualizada, HttpStatus.OK);
    }

    // Eliminar una visita
    @DeleteMapping("/visitas/{id}")
    public ResponseEntity<Void> eliminarVisita(@PathVariable Integer id) {
        System.out.println("Eliminando visita con ID: " + id);
        visitaService.eliminarVisita(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
