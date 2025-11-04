// src/services/EnfermedadService.js
import api from "./api";

const STORAGE_KEY = "asociacionesEnfermedades";

const EnfermedadService = {
  // 🔹 Utilidades internas
  _getAsociacionesLocal: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  },

  _setAsociacionesLocal: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // 🔹 Listar todas las enfermedades con síntomas asociados (localmente)
  listar: async () => {
    const res = await api.get("/enfermedades");
    const enfermedades = res.data;
    const asociaciones = EnfermedadService._getAsociacionesLocal();

    return enfermedades.map((e) => ({
      ...e,
      sintomasAsociados: asociaciones[e.idEnfermedad] || [],
    }));
  },

  // 🔹 Registrar nueva enfermedad + guardar asociaciones locales
  registrar: async (data) => {
    const res = await api.post("/enfermedades", data);
    const nueva = res.data;

    const asociaciones = EnfermedadService._getAsociacionesLocal();
    asociaciones[nueva.idEnfermedad] = data.sintomasAsociados || [];
    EnfermedadService._setAsociacionesLocal(asociaciones);

    return { ...nueva, sintomasAsociados: data.sintomasAsociados || [] };
  },

  // 🔹 Actualizar enfermedad + actualizar asociaciones locales
  actualizar: async (id, data) => {
    const res = await api.put(`/enfermedades/${id}`, data);
    const actualizada = res.data;

    const asociaciones = EnfermedadService._getAsociacionesLocal();
    asociaciones[id] = data.sintomasAsociados || [];
    EnfermedadService._setAsociacionesLocal(asociaciones);

    return { ...actualizada, sintomasAsociados: data.sintomasAsociados || [] };
  },

  // 🔹 Eliminar enfermedad + limpiar asociaciones
  eliminar: async (id) => {
    await api.delete(`/enfermedades/${id}`);
    const asociaciones = EnfermedadService._getAsociacionesLocal();
    delete asociaciones[id];
    EnfermedadService._setAsociacionesLocal(asociaciones);
  },

  // 🔹 Buscar por código (manteniendo asociaciones)
  buscarPorCodigo: async (codigo) => {
    const res = await api.get(`/enfermedades/codigo/${codigo}`);
    const enfermedad = res.data;
    const asociaciones = EnfermedadService._getAsociacionesLocal();

    return { ...enfermedad, sintomasAsociados: asociaciones[enfermedad.idEnfermedad] || [] };
  },

  // 🔹 Buscar por categoría (manteniendo asociaciones)
  buscarPorCategoria: async (categoria) => {
    const res = await api.get(`/enfermedades/categoria/${categoria}`);
    const enfermedades = res.data;
    const asociaciones = EnfermedadService._getAsociacionesLocal();

    return enfermedades.map((e) => ({
      ...e,
      sintomasAsociados: asociaciones[e.idEnfermedad] || [],
    }));
  },

  // 🔹 (Opcional) Ver asociaciones locales en consola (para debug)
  listarAsociacionesLocales: () => {
    console.table(EnfermedadService._getAsociacionesLocal());
  },
};

export default EnfermedadService;
