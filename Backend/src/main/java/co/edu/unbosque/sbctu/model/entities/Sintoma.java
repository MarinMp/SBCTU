package co.edu.unbosque.sbctu.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "sintoma")
public class Sintoma implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sintoma")
    private Integer idSintoma;

    @Column(name = "nombre_sintoma", nullable = false, length = 100)
    private String nombreSintoma;

    @Column(name = "descripcion", length = 100)
    private String descripcion;

    // Relación intermedia con TriageSintoma (ya no ManyToMany)
    @OneToMany(mappedBy = "sintoma", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TriageSintoma> triageSintomas;

    // Relación con Enfermedad (mantén esta si ya la tienes)
    @ManyToMany
    @JoinTable(
            name = "enfermedad_sintoma",
            joinColumns = @JoinColumn(name = "sintoma_id_sintoma"),
            inverseJoinColumns = @JoinColumn(name = "enfermedad_id_enfermedad")
    )
    @JsonIgnore
    private List<Enfermedad> enfermedades;

    public Sintoma() {}

    // Getters y Setters
    public Integer getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(Integer idSintoma) {
        this.idSintoma = idSintoma;
    }

    public String getNombreSintoma() {
        return nombreSintoma;
    }

    public void setNombreSintoma(String nombreSintoma) {
        this.nombreSintoma = nombreSintoma;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<TriageSintoma> getTriageSintomas() {
        return triageSintomas;
    }

    public void setTriageSintomas(List<TriageSintoma> triageSintomas) {
        this.triageSintomas = triageSintomas;
    }

    public List<Enfermedad> getEnfermedades() {
        return enfermedades;
    }

    public void setEnfermedades(List<Enfermedad> enfermedades) {
        this.enfermedades = enfermedades;
    }
}
