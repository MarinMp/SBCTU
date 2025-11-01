package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "personal_medico")
public class PersonalMedico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_personal")
    private Integer idPersonal;

    @Column(name = "primer_nombre", nullable = false, length = 15)
    private String primerNombre;

    @Column(name = "segundo_nombre", length = 15)
    private String segundoNombre;

    @Column(name = "primer_apellido", nullable = false, length = 15)
    private String primerApellido;

    @Column(name = "segundo_apellido", length = 15)
    private String segundoApellido;

    @Column(name = "numero_licencia", nullable = false, unique = true, length = 30)
    private String numeroLicencia;

    @Column(name = "cargo", nullable = false, length = 20)
    private String cargo;

    @Column(name = "correo_institucional", nullable = false, unique = true, length = 100)
    private String correoInstitucional;

    @OneToMany(mappedBy = "personalMedico", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Triage> triages;

    @OneToMany(mappedBy = "personalMedico", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Diagnostico> diagnosticos;

    public PersonalMedico() {}

    public Integer getIdPersonal() {
        return idPersonal;
    }

    public void setIdPersonal(Integer idPersonal) {
        this.idPersonal = idPersonal;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getNumeroLicencia() {
        return numeroLicencia;
    }

    public void setNumeroLicencia(String numeroLicencia) {
        this.numeroLicencia = numeroLicencia;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCorreoInstitucional() {
        return correoInstitucional;
    }

    public void setCorreoInstitucional(String correoInstitucional) {
        this.correoInstitucional = correoInstitucional;
    }

    public List<Triage> getTriages() {
        return triages;
    }

    public void setTriages(List<Triage> triages) {
        this.triages = triages;
    }

    public List<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public void setDiagnosticos(List<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }
}
