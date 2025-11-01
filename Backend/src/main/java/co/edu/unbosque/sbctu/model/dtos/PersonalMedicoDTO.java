package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;

public class PersonalMedicoDTO implements Serializable {

    private Integer idPersonal;
    private String primerNombre;
    private String segundoNombre;
    private String primerApellido;
    private String segundoApellido;
    private String numeroLicencia;
    private String cargo;
    private String correoInstitucional;

    public PersonalMedicoDTO() {
    }

    public PersonalMedicoDTO(Integer idPersonal, String primerNombre, String segundoNombre,
                             String primerApellido, String segundoApellido,
                             String numeroLicencia, String cargo, String correoInstitucional) {
        this.idPersonal = idPersonal;
        this.primerNombre = primerNombre;
        this.segundoNombre = segundoNombre;
        this.primerApellido = primerApellido;
        this.segundoApellido = segundoApellido;
        this.numeroLicencia = numeroLicencia;
        this.cargo = cargo;
        this.correoInstitucional = correoInstitucional;
    }

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
}
