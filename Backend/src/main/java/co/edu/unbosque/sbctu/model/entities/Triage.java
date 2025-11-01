package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "triage")
public class Triage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_triage")
    private Integer idTriage;

    @Column(name = "observaciones", nullable = false, length = 100)
    private String observaciones;

    @Column(name = "constantes_vitales", nullable = false, length = 100)
    private String constantesVitales;

    @Column(name = "hora_atencion", nullable = false)
    private LocalTime horaAtencion;

    // 🔥 CAMBIA ESTO
    // ❌ Antes:
    // @OneToOne(mappedBy = "triage", fetch = FetchType.LAZY)
    // @JsonIgnore
    // private Visita visita;


    @OneToOne
    @JoinColumn(name = "visita_id_visita", nullable = false)
    private Visita visita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_medico_id_personal", nullable = false)
    private PersonalMedico personalMedico;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nivel_urgencia_id_nivel_urgencia", nullable = false)
    private NivelUrgencia nivelUrgencia;

    @OneToMany(mappedBy = "triage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    @JsonIgnore
    private List<TriageSintoma> triageSintomas;

    @OneToMany(mappedBy = "triage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Fetch(FetchMode.SUBSELECT)
    @JsonIgnore
    private List<Diagnostico> diagnosticos;

    public Triage() {}

    // Getters y Setters
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

    public Visita getVisita() {
        return visita;
    }

    public void setVisita(Visita visita) {
        this.visita = visita;
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

    public List<TriageSintoma> getTriageSintomas() {
        return triageSintomas;
    }

    public void setTriageSintomas(List<TriageSintoma> triageSintomas) {
        this.triageSintomas = triageSintomas;
    }

    public List<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public void setDiagnosticos(List<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }
}
