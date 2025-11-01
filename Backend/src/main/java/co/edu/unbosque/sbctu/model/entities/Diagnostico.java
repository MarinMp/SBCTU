package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "diagnostico")
public class Diagnostico implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_diagnostico")
    private Integer idDiagnostico;

    @Column(name = "fecha_diagnostico", nullable = false)
    private LocalDate fechaDiagnostico;

    @Column(name = "tipo_diagnostico", nullable = false, length = 20)
    private String tipoDiagnostico;

    @Column(name = "observaciones", length = 100)
    private String observaciones;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enfermedad_id_enfermedad", nullable = false)
    private Enfermedad enfermedad;

    // 🔹 Mantenemos el @JsonIgnore aquí para evitar loops recursivos
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "triage_id_triage", nullable = false)
    @JsonIgnore
    private Triage triage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_medico_id_personal", nullable = false)
    private PersonalMedico personalMedico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nivel_urgencia_id_nivel_urgencia", nullable = false)
    private NivelUrgencia nivelUrgencia;

    public Diagnostico() {}

    // --- Getters y Setters ---
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

    public Enfermedad getEnfermedad() {
        return enfermedad;
    }

    public void setEnfermedad(Enfermedad enfermedad) {
        this.enfermedad = enfermedad;
    }

    public Triage getTriage() {
        return triage;
    }

    public void setTriage(Triage triage) {
        this.triage = triage;
    }

    public PersonalMedico getPersonalMedico() {
        return personalMedico;
    }

    public void setPersonalMedico(PersonalMedico personalMedico) {
        this.personalMedico = personalMedico;
    }

    public NivelUrgencia getNivelUrgencia() {
        return nivelUrgencia;
    }

    public void setNivelUrgencia(NivelUrgencia nivelUrgencia) {
        this.nivelUrgencia = nivelUrgencia;
    }
}
