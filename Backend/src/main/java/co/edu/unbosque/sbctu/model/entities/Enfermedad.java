package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "enfermedad")
public class Enfermedad implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_enfermedad")
    private Integer idEnfermedad;

    @Column(name = "nombre_enfermedad", nullable = false, length = 50)
    private String nombreEnfermedad;

    @Column(name = "descripcion", length = 100)
    private String descripcion;

    @Column(name = "codigo_enfermedad", nullable = false, unique = true)
    private Integer codigoEnfermedad;

    @Column(name = "tratamiento", length = 100)
    private String tratamiento;

    @Column(name = "observaciones", length = 100)
    private String observaciones;

    @Column(name = "categoria", nullable = false, length = 30)
    private String categoria;

    @ManyToMany(mappedBy = "enfermedades")
    @JsonIgnore
    private List<Sintoma> sintomas;

    @OneToMany(mappedBy = "enfermedad", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Diagnostico> diagnosticos;

    public Enfermedad() {}

    public Integer getIdEnfermedad() {
        return idEnfermedad;
    }

    public void setIdEnfermedad(Integer idEnfermedad) {
        this.idEnfermedad = idEnfermedad;
    }

    public String getNombreEnfermedad() {
        return nombreEnfermedad;
    }

    public void setNombreEnfermedad(String nombreEnfermedad) {
        this.nombreEnfermedad = nombreEnfermedad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getCodigoEnfermedad() {
        return codigoEnfermedad;
    }

    public void setCodigoEnfermedad(Integer codigoEnfermedad) {
        this.codigoEnfermedad = codigoEnfermedad;
    }

    public String getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public List<Sintoma> getSintomas() {
        return sintomas;
    }

    public void setSintomas(List<Sintoma> sintomas) {
        this.sintomas = sintomas;
    }

    public List<Diagnostico> getDiagnosticos() {
        return diagnosticos;
    }

    public void setDiagnosticos(List<Diagnostico> diagnosticos) {
        this.diagnosticos = diagnosticos;
    }
}
