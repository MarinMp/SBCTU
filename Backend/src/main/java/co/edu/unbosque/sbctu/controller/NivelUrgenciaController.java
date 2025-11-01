package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.NivelUrgenciaDTO;
import co.edu.unbosque.sbctu.services.NivelUrgenciaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class NivelUrgenciaController {

    private final NivelUrgenciaService nivelUrgenciaService;

    public NivelUrgenciaController(NivelUrgenciaService nivelUrgenciaService) {
        this.nivelUrgenciaService = nivelUrgenciaService;
    }

    // Registrar un nuevo nivel de urgencia
    @PostMapping("/niveles-urgencia")
    public ResponseEntity<NivelUrgenciaDTO> registrarNivel(@RequestBody NivelUrgenciaDTO dto) {
        System.out.println("Registrando nuevo nivel de urgencia...");
        NivelUrgenciaDTO nuevo = nivelUrgenciaService.registrarNivel(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todos los niveles de urgencia
    @GetMapping("/niveles-urgencia")
    public ResponseEntity<List<NivelUrgenciaDTO>> listarNiveles() {
        System.out.println("Listando todos los niveles de urgencia...");
        return new ResponseEntity<>(nivelUrgenciaService.listarNiveles(), HttpStatus.OK);
    }

    // Buscar nivel de urgencia por ID
    @GetMapping("/niveles-urgencia/{id}")
    public ResponseEntity<NivelUrgenciaDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando nivel de urgencia con ID: " + id);
        return new ResponseEntity<>(nivelUrgenciaService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar nivel de urgencia por código
    @GetMapping("/niveles-urgencia/codigo/{codigo}")
    public ResponseEntity<NivelUrgenciaDTO> buscarPorCodigo(@PathVariable Integer codigo) {
        System.out.println("Buscando nivel de urgencia con código: " + codigo);
        return new ResponseEntity<>(nivelUrgenciaService.obtenerPorCodigo(codigo), HttpStatus.OK);
    }

    // Actualizar nivel de urgencia
    @PutMapping("/niveles-urgencia/{id}")
    public ResponseEntity<NivelUrgenciaDTO> actualizarNivel(@PathVariable Integer id, @RequestBody NivelUrgenciaDTO dto) {
        System.out.println("Actualizando nivel de urgencia con ID: " + id);
        NivelUrgenciaDTO actualizado = nivelUrgenciaService.actualizarNivel(id, dto);
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }

    // Eliminar nivel de urgencia
    @DeleteMapping("/niveles-urgencia/{id}")
    public ResponseEntity<Void> eliminarNivel(@PathVariable Integer id) {
        System.out.println("Eliminando nivel de urgencia con ID: " + id);
        nivelUrgenciaService.eliminarNivel(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
