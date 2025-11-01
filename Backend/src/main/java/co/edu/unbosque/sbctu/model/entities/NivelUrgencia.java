package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "nivel_urgencia")
public class NivelUrgencia implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nivel_urgencia")
    private Integer idNivelUrgencia;

    @Column(name = "codigo_nivel", nullable = false, unique = true)
    private Integer codigoNivel;

    @Column(name = "descripcion", nullable = false, length = 30)
    private String descripcion;

    @OneToMany(mappedBy = "nivelUrgencia", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Triage> triages;

    @OneToMany(mappedBy = "nivelUrgencia", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Diagnostico> diagnosticos;

    public NivelUrgencia() {}

    public Integer getIdNivelUrgencia() {
        return idNivelUrgencia;
    }

    public void setIdNivelUrgencia(Integer idNivelUrgencia) {
        this.idNivelUrgencia = idNivelUrgencia;
    }

    public Integer getCodigoNivel() {
        return codigoNivel;
    }

    public void setCodigoNivel(Integer codigoNivel) {
        this.codigoNivel = codigoNivel;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
