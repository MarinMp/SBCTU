package co.edu.unbosque.sbctu.model.entities;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "enfermedad_sintoma")
public class EnfermedadSintoma implements Serializable {

    @EmbeddedId
    private EnfermedadSintomaId id = new EnfermedadSintomaId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idSintoma")
    @JoinColumn(name = "sintoma_id_sintoma", nullable = false)
    private Sintoma sintoma;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idEnfermedad")
    @JoinColumn(name = "enfermedad_id_enfermedad", nullable = false)
    private Enfermedad enfermedad;

    public EnfermedadSintoma() {}

    public EnfermedadSintoma(Sintoma sintoma, Enfermedad enfermedad) {
        this.sintoma = sintoma;
        this.enfermedad = enfermedad;
        this.id = new EnfermedadSintomaId(
                sintoma != null ? sintoma.getIdSintoma() : null,
                enfermedad != null ? enfermedad.getIdEnfermedad() : null
        );
    }

    public EnfermedadSintomaId getId() {
        return id;
    }

    public void setId(EnfermedadSintomaId id) {
        this.id = id;
    }

    public Sintoma getSintoma() {
        return sintoma;
    }

    public void setSintoma(Sintoma sintoma) {
        this.sintoma = sintoma;
    }

    public Enfermedad getEnfermedad() {
        return enfermedad;
    }

    public void setEnfermedad(Enfermedad enfermedad) {
        this.enfermedad = enfermedad;
    }
}
