package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

public class VisitaDTO implements Serializable {

    private Integer idVisita;
    private LocalDate fechaVisita;
    private LocalTime horaVisita;
    private String motivoConsulta;
    private String estadoVisita;
    private Integer idPaciente;
    private Integer idTriage;

    public VisitaDTO() {
    }

    public VisitaDTO(Integer idVisita, LocalDate fechaVisita, LocalTime horaVisita,
                     String motivoConsulta, String estadoVisita,
                     Integer idPaciente, Integer idTriage) {
        this.idVisita = idVisita;
        this.fechaVisita = fechaVisita;
        this.horaVisita = horaVisita;
        this.motivoConsulta = motivoConsulta;
        this.estadoVisita = estadoVisita;
        this.idPaciente = idPaciente;
        this.idTriage = idTriage;
    }

    public Integer getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(Integer idVisita) {
        this.idVisita = idVisita;
    }

    public LocalDate getFechaVisita() {
        return fechaVisita;
    }

    public void setFechaVisita(LocalDate fechaVisita) {
        this.fechaVisita = fechaVisita;
    }

    public LocalTime getHoraVisita() {
        return horaVisita;
    }

    public void setHoraVisita(LocalTime horaVisita) {
        this.horaVisita = horaVisita;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public String getEstadoVisita() {
        return estadoVisita;
    }

    public void setEstadoVisita(String estadoVisita) {
        this.estadoVisita = estadoVisita;
    }

    public Integer getIdPaciente() {
        return idPaciente;
    }

    public void setIdPaciente(Integer idPaciente) {
        this.idPaciente = idPaciente;
    }

    public Integer getIdTriage() {
        return idTriage;
    }

    public void setIdTriage(Integer idTriage) {
        this.idTriage = idTriage;
    }
}
