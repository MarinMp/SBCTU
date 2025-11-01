package co.edu.unbosque.sbctu.controller;

import co.edu.unbosque.sbctu.model.dtos.PersonalMedicoDTO;
import co.edu.unbosque.sbctu.services.PersonalMedicoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sbctu/api")
public class PersonalMedicoController {

    private final PersonalMedicoService personalMedicoService;

    public PersonalMedicoController(PersonalMedicoService personalMedicoService) {
        this.personalMedicoService = personalMedicoService;
    }

    // Registrar nuevo personal médico
    @PostMapping("/personal-medico")
    public ResponseEntity<PersonalMedicoDTO> registrarPersonal(@RequestBody PersonalMedicoDTO dto) {
        System.out.println("Registrando nuevo personal médico...");
        PersonalMedicoDTO nuevo = personalMedicoService.registrarPersonal(dto);
        return new ResponseEntity<>(nuevo, HttpStatus.CREATED);
    }

    // Listar todo el personal médico
    @GetMapping("/personal-medico")
    public ResponseEntity<List<PersonalMedicoDTO>> listarPersonal() {
        System.out.println("Listando todo el personal médico...");
        return new ResponseEntity<>(personalMedicoService.listarPersonal(), HttpStatus.OK);
    }

    // Buscar personal médico por ID
    @GetMapping("/personal-medico/{id}")
    public ResponseEntity<PersonalMedicoDTO> buscarPorId(@PathVariable Integer id) {
        System.out.println("Buscando personal médico con ID: " + id);
        return new ResponseEntity<>(personalMedicoService.obtenerPorId(id), HttpStatus.OK);
    }

    // Buscar por número de licencia
    @GetMapping("/personal-medico/licencia/{numeroLicencia}")
    public ResponseEntity<PersonalMedicoDTO> buscarPorLicencia(@PathVariable String numeroLicencia) {
        System.out.println("Buscando personal médico con licencia: " + numeroLicencia);
        return new ResponseEntity<>(personalMedicoService.obtenerPorLicencia(numeroLicencia), HttpStatus.OK);
    }

    // Actualizar datos del personal médico
    @PutMapping("/personal-medico/{id}")
    public ResponseEntity<PersonalMedicoDTO> actualizarPersonal(@PathVariable Integer id, @RequestBody PersonalMedicoDTO dto) {
        System.out.println("Actualizando información del personal médico con ID: " + id);
        PersonalMedicoDTO actualizado = personalMedicoService.actualizarPersonal(id, dto);
        return new ResponseEntity<>(actualizado, HttpStatus.OK);
    }

    // Eliminar registro de personal médico
    @DeleteMapping("/personal-medico/{id}")
    public ResponseEntity<Void> eliminarPersonal(@PathVariable Integer id) {
        System.out.println("Eliminando personal médico con ID: " + id);
        personalMedicoService.eliminarPersonal(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
