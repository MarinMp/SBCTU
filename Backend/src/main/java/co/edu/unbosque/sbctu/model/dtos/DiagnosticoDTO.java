package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;
import java.time.LocalDate;

public class DiagnosticoDTO implements Serializable {

    private Integer idDiagnostico;
    private LocalDate fechaDiagnostico;
    private String tipoDiagnostico;
    private String observaciones;
    private Integer idEnfermedad;
    private Integer idTriage;
    private Integer idPersonalMedico;
    private Integer idNivelUrgencia;

    public DiagnosticoDTO() {
    }

    public DiagnosticoDTO(Integer idDiagnostico, LocalDate fechaDiagnostico, String tipoDiagnostico,
                          String observaciones, Integer idEnfermedad, Integer idTriage,
                          Integer idPersonalMedico, Integer idNivelUrgencia) {
        this.idDiagnostico = idDiagnostico;
        this.fechaDiagnostico = fechaDiagnostico;
        this.tipoDiagnostico = tipoDiagnostico;
        this.observaciones = observaciones;
        this.idEnfermedad = idEnfermedad;
        this.idTriage = idTriage;
        this.idPersonalMedico = idPersonalMedico;
        this.idNivelUrgencia = idNivelUrgencia;
    }

    public Integer getIdDiagnostico() {
        return idDiagnostico;
    }

    public void setIdDiagnostico(Integer idDiagnostico) {
        this.idDiagnostico = idDiagnostico;
    }

    public LocalDate getFechaDiagnostico() {
        return fechaDiagnostico;
    }

    public void setFechaDiagnostico(LocalDate fechaDiagnostico) {
        this.fechaDiagnostico = fechaDiagnostico;
    }

    public String getTipoDiagnostico() {
        return tipoDiagnostico;
    }

    public void setTipoDiagnostico(String tipoDiagnostico) {
        this.tipoDiagnostico = tipoDiagnostico;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Integer getIdEnfermedad() {
        return idEnfermedad;
    }

    public void setIdEnfermedad(Integer idEnfermedad) {
        this.idEnfermedad = idEnfermedad;
    }

    public Integer getIdTriage() {
        return idTriage;
    }

    public void setIdTriage(Integer idTriage) {
        this.idTriage = idTriage;
    }

    public Integer getIdPersonalMedico() {
        return idPersonalMedico;
    }

    public void setIdPersonalMedico(Integer idPersonalMedico) {
        this.idPersonalMedico = idPersonalMedico;
    }

    public Integer getIdNivelUrgencia() {
        return idNivelUrgencia;
    }

    public void setIdNivelUrgencia(Integer idNivelUrgencia) {
        this.idNivelUrgencia = idNivelUrgencia;
    }
}
