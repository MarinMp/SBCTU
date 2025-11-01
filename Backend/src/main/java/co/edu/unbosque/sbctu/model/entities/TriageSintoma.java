package co.edu.unbosque.sbctu.model.entities;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "triage_sintoma")
public class TriageSintoma implements Serializable {

    @EmbeddedId
    private TriageSintomaId id = new TriageSintomaId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idTriage")
    @JoinColumn(name = "triage_id_triage", nullable = false)
    private Triage triage;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idSintoma")
    @JoinColumn(name = "sintoma_id_sintoma", nullable = false)
    private Sintoma sintoma;

    public TriageSintoma() {}

    public TriageSintoma(Triage triage, Sintoma sintoma) {
        this.triage = triage;
        this.sintoma = sintoma;
        this.id = new TriageSintomaId(
                triage != null ? triage.getIdTriage() : null,
                sintoma != null ? sintoma.getIdSintoma() : null
        );
    }

    // Getters y Setters
    public TriageSintomaId getId() {
        return id;
    }

    public void setId(TriageSintomaId id) {
        this.id = id;
    }

    public Triage getTriage() {
        return triage;
    }

    public void setTriage(Triage triage) {
        this.triage = triage;
        if (triage != null) {
            this.id.setIdTriage(triage.getIdTriage());
        }
    }

    public Sintoma getSintoma() {
        return sintoma;
    }

    public void setSintoma(Sintoma sintoma) {
        this.sintoma = sintoma;
        if (sintoma != null) {
            this.id.setIdSintoma(sintoma.getIdSintoma());
        }
    }
}
