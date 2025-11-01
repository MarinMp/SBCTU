package co.edu.unbosque.sbctu.model.dtos;

import java.io.Serializable;

public class EnfermedadDTO implements Serializable {

    private Integer idEnfermedad;
    private String nombreEnfermedad;
    private String descripcion;
    private Integer codigoEnfermedad;
    private String tratamiento;
    private String observaciones;
    private String categoria;

    public EnfermedadDTO() {
    }

    public EnfermedadDTO(Integer idEnfermedad, String nombreEnfermedad, String descripcion,
                         Integer codigoEnfermedad, String tratamiento, String observaciones,
                         String categoria) {
        this.idEnfermedad = idEnfermedad;
        this.nombreEnfermedad = nombreEnfermedad;
        this.descripcion = descripcion;
        this.codigoEnfermedad = codigoEnfermedad;
        this.tratamiento = tratamiento;
        this.observaciones = observaciones;
        this.categoria = categoria;
    }

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
}
