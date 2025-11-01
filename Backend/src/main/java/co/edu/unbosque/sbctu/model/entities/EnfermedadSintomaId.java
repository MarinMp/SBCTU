package co.edu.unbosque.sbctu.model.entities;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class EnfermedadSintomaId implements Serializable {

    private Integer idSintoma;
    private Integer idEnfermedad;

    public EnfermedadSintomaId() {}

    public EnfermedadSintomaId(Integer idSintoma, Integer idEnfermedad) {
        this.idSintoma = idSintoma;
        this.idEnfermedad = idEnfermedad;
    }

    public Integer getIdSintoma() {
        return idSintoma;
    }

    public void setIdSintoma(Integer idSintoma) {
        this.idSintoma = idSintoma;
    }

    public Integer getIdEnfermedad() {
        return idEnfermedad;
    }

    public void setIdEnfermedad(Integer idEnfermedad) {
        this.idEnfermedad = idEnfermedad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnfermedadSintomaId)) return false;
        EnfermedadSintomaId that = (EnfermedadSintomaId) o;
        return Objects.equals(idSintoma, that.idSintoma)
                && Objects.equals(idEnfermedad, that.idEnfermedad);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idSintoma, idEnfermedad);
    }
}
