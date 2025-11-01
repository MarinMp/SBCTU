package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.SintomaDTO;
import co.edu.unbosque.sbctu.services.SintomaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class SintomaController {

    private final SintomaService sintomaService;

    public SintomaController(SintomaService sintomaService) {
        this.sintomaService = sintomaService;
    }

    // Registrar nuevo síntoma
    @PostMapping("/sintomas")
    public ResponseEntity<SintomaDTO> registrarSintoma(@RequestBody SintomaDTO dto) {
        System.out.println("Registrando nuevo síntoma...");
        SintomaDTO nuevo = sintomaService.registrarSintoma(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todos los síntomas
    @GetMapping("/sintomas")
    public ResponseEntity<List<SintomaDTO>> listarSintomas() {
        System.out.println("Listando todos los síntomas...");
        return new ResponseEntity<>(sintomaService.listarSintomas(), HttpStatus.OK);
    }

    // Buscar síntoma por ID
    @GetMapping("/sintomas/{id}")
    public ResponseEntity<SintomaDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando síntoma con ID: " + id);
        return new ResponseEntity<>(sintomaService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar síntoma por nombre exacto
    @GetMapping("/sintomas/nombre/{nombre}")
    public ResponseEntity<SintomaDTO> buscarPorNombre(@PathVariable String nombre) {
        System.out.println("Buscando síntoma con nombre: " + nombre);
        return new ResponseEntity<>(sintomaService.obtenerPorNombre(nombre), HttpStatus.OK);
    }

    // Buscar síntomas por palabra clave (coincidencia parcial)
    @GetMapping("/sintomas/buscar/{palabra}")
    public ResponseEntity<List<SintomaDTO>> buscarPorPalabraClave(@PathVariable String palabra) {
        System.out.println("Buscando síntomas que contengan: " + palabra);
        return new ResponseEntity<>(sintomaService.buscarPorPalabraClave(palabra), HttpStatus.OK);
    }

    // Actualizar síntoma existente
    @PutMapping("/sintomas/{id}")
    public ResponseEntity<SintomaDTO> actualizarSintoma(@PathVariable Integer id, @RequestBody SintomaDTO dto) {
        System.out.println("Actualizando síntoma con ID: " + id);
        SintomaDTO actualizado = sintomaService.actualizarSintoma(id, dto);
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }

    // Eliminar síntoma
    @DeleteMapping("/sintomas/{id}")
    public ResponseEntity<Void> eliminarSintoma(@PathVariable Integer id) {
        System.out.println("Eliminando síntoma con ID: " + id);
        sintomaService.eliminarSintoma(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
