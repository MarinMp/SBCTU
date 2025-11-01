package co.edu.unbosque.sbctu.model.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TriageSintomaId implements Serializable {

    @Column(name = "triage_id_triage")
    private Integer idTriage;

    @Column(name = "sintoma_id_sintoma")
    private Integer idSintoma;

    public TriageSintomaId() {}

    public TriageSintomaId(Integer idTriage, Integer idSintoma) {
        this.idTriage = idTriage;
        this.idSintoma = idSintoma;
    }

    public Integer getIdTriage() {
        return idTriage;
    }

    public void setIdTriage(Integer idTriage) {
        this.idTriage = idTriage;
    }

    public Integer getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(Integer idSintoma) {
        this.idSintoma = idSintoma;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TriageSintomaId)) return false;
        TriageSintomaId that = (TriageSintomaId) o;
        return Objects.equals(idTriage, that.idTriage) &&
                Objects.equals(idSintoma, that.idSintoma);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idTriage, idSintoma);
    }
}
