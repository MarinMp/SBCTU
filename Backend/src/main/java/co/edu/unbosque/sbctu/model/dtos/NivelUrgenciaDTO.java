package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;

public class NivelUrgenciaDTO implements Serializable {

    private Integer idNivelUrgencia;
    private Integer codigoNivel;
    private String descripcion;

    public NivelUrgenciaDTO() {
    }

    public NivelUrgenciaDTO(Integer idNivelUrgencia, Integer codigoNivel, String descripcion) {
        this.idNivelUrgencia = idNivelUrgencia;
        this.codigoNivel = codigoNivel;
        this.descripcion = descripcion;
    }

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
}
