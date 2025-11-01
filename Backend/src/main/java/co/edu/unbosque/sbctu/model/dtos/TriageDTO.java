package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;
import java.time.LocalTime;

public class TriageDTO implements Serializable {

    private Integer idTriage;
    private String observaciones;
    private String constantesVitales;
    private LocalTime horaAtencion;
    private Integer idVisita;
    private Integer idPersonalMedico;
    private Integer idNivelUrgencia;

    public TriageDTO() {
    }

    public TriageDTO(Integer idTriage, String observaciones, String constantesVitales,
                     LocalTime horaAtencion, Integer idVisita,
                     Integer idPersonalMedico, Integer idNivelUrgencia) {
        this.idTriage = idTriage;
        this.observaciones = observaciones;
        this.constantesVitales = constantesVitales;
        this.horaAtencion = horaAtencion;
        this.idVisita = idVisita;
        this.idPersonalMedico = idPersonalMedico;
        this.idNivelUrgencia = idNivelUrgencia;
    }

    public Integer getIdTriage() {
        return idTriage;
    }

    public void setIdTriage(Integer idTriage) {
        this.idTriage = idTriage;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getConstantesVitales() {
        return constantesVitales;
    }

    public void setConstantesVitales(String constantesVitales) {
        this.constantesVitales = constantesVitales;
    }

    public LocalTime getHoraAtencion() {
        return horaAtencion;
    }

    public void setHoraAtencion(LocalTime horaAtencion) {
        this.horaAtencion = horaAtencion;
    }

    public Integer getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Integer idVisita) {
        this.idVisita = idVisita;
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
