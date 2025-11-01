package co.edu.unbosque.sbctu.model.entities;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "visita")
public class Visita implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_visita")
    private Integer idVisita;

    @Column(name = "fecha_visita", nullable = false)
    private LocalDate fechaVisita;

    @Column(name = "hora_visita", nullable = false)
    private LocalTime horaVisita;

    @Column(name = "motivo_consulta", nullable = false, length = 200)
    private String motivoConsulta;

    @Column(name = "estado_visita", nullable = false, length = 20)
    private String estadoVisita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id_paciente", nullable = false)
    private Paciente paciente;

    // Visita tiene la FK hacia Triage (es la dueña de la relación)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "triage_id_triage")
    private Triage triage;

    public Visita() {}

    // Getters y setters
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

    public Paciente getPaciente() {
        return paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Triage getTriage() {
        return triage;
    }

    public void setTriage(Triage triage) {
        this.triage = triage;
    }
}
