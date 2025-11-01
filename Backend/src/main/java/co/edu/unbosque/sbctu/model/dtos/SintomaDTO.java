package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;

public class SintomaDTO implements Serializable {

    private Integer idSintoma;
    private String nombreSintoma;
    private String descripcion;

    public SintomaDTO() {
    }

    public SintomaDTO(Integer idSintoma, String nombreSintoma, String descripcion) {
        this.idSintoma = idSintoma;
        this.nombreSintoma = nombreSintoma;
        this.descripcion = descripcion;
    }

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
}
