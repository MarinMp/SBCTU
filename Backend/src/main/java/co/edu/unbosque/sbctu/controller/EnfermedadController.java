package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.EnfermedadDTO;
import co.edu.unbosque.sbctu.services.EnfermedadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class EnfermedadController {

    private final EnfermedadService enfermedadService;

    public EnfermedadController(EnfermedadService enfermedadService) {
        this.enfermedadService = enfermedadService;
    }

    // Registrar una nueva enfermedad
    @PostMapping("/enfermedades")
    public ResponseEntity<EnfermedadDTO> registrarEnfermedad(@RequestBody EnfermedadDTO dto) {
        System.out.println("Registrando nueva enfermedad...");
        EnfermedadDTO nueva = enfermedadService.registrarEnfermedad(dto);
        return new ResponseEntity<>(nueva, HttpStatus.CREATED);
    }

    // Listar todas las enfermedades
    @GetMapping("/enfermedades")
    public ResponseEntity<List<EnfermedadDTO>> listarEnfermedades() {
        System.out.println("Listando todas las enfermedades...");
        return new ResponseEntity<>(enfermedadService.listarEnfermedades(), HttpStatus.OK);
    }

    // Buscar enfermedad por ID
    @GetMapping("/enfermedades/{id}")
    public ResponseEntity<EnfermedadDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando enfermedad con ID: " + id);
        return new ResponseEntity<>(enfermedadService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar enfermedad por código
    @GetMapping("/enfermedades/codigo/{codigo}")
    public ResponseEntity<EnfermedadDTO> buscarPorCodigo(@PathVariable Integer codigo) {
        System.out.println("Buscando enfermedad con código: " + codigo);
        return new ResponseEntity<>(enfermedadService.obtenerPorCodigo(codigo), HttpStatus.OK);
    }

    // Buscar enfermedades por categoría
    @GetMapping("/enfermedades/categoria/{categoria}")
    public ResponseEntity<List<EnfermedadDTO>> buscarPorCategoria(@PathVariable String categoria) {
        System.out.println("Buscando enfermedades por categoría: " + categoria);
        return new ResponseEntity<>(enfermedadService.obtenerPorCategoria(categoria), HttpStatus.OK);
    }

    // Actualizar enfermedad existente
    @PutMapping("/enfermedades/{id}")
    public ResponseEntity<EnfermedadDTO> actualizarEnfermedad(@PathVariable Integer id, @RequestBody EnfermedadDTO dto) {
        System.out.println("Actualizando enfermedad con ID: " + id);
        EnfermedadDTO actualizada = enfermedadService.actualizarEnfermedad(id, dto);
        return new ResponseEntity<>(actualizada, HttpStatus.OK);
    }

    // Eliminar enfermedad
    @DeleteMapping("/enfermedades/{id}")
    public ResponseEntity<Void> eliminarEnfermedad(@PathVariable Integer id) {
        System.out.println("Eliminando enfermedad con ID: " + id);
        enfermedadService.eliminarEnfermedad(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
