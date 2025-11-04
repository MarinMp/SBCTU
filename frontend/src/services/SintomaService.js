// src/services/SintomaService.js
import api from "./api";

const STORAGE_KEY = "asociacionesSintomas";

const SintomaService = {
  // 🧠 Utilidad interna: cargar asociaciones desde localStorage
  _getAsociacionesLocal: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  },

  // 🧠 Guardar asociaciones en localStorage
  _setAsociacionesLocal: (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  // 📋 Listar todos los síntomas + asociaciones locales
  listar: async () => {
    const res = await api.get("/sintomas");
    const sintomas = res.data;
    const asociaciones = SintomaService._getAsociacionesLocal();

    // Combinar datos reales con asociaciones locales
    return sintomas.map((s) => ({
      ...s,
      enfermedadesAsociadas: asociaciones[s.idSintoma] || [],
    }));
  },

  // ➕ Registrar síntoma y guardar asociaciones locales
  registrar: async (data) => {
    const res = await api.post("/sintomas", data);
    const nuevo = res.data;

    // Guardar enfermedades asociadas localmente
    const asociaciones = SintomaService._getAsociacionesLocal();
    asociaciones[nuevo.idSintoma] = data.enfermedadesAsociadas || [];
    SintomaService._setAsociacionesLocal(asociaciones);

    return { ...nuevo, enfermedadesAsociadas: data.enfermedadesAsociadas || [] };
  },

  // ✏️ Actualizar síntoma + asociaciones locales
  actualizar: async (id, data) => {
    const res = await api.put(`/sintomas/${id}`, data);
    const actualizado = res.data;

    const asociaciones = SintomaService._getAsociacionesLocal();
    asociaciones[id] = data.enfermedadesAsociadas || [];
    SintomaService._setAsociacionesLocal(asociaciones);

    return { ...actualizado, enfermedadesAsociadas: data.enfermedadesAsociadas || [] };
  },

  // 🗑️ Eliminar síntoma y limpiar asociaciones locales
  eliminar: async (id) => {
    await api.delete(`/sintomas/${id}`);
    const asociaciones = SintomaService._getAsociacionesLocal();
    delete asociaciones[id];
    SintomaService._setAsociacionesLocal(asociaciones);
  },

  // 🔍 Buscar por nombre exacto
  buscarPorNombre: async (nombre) => {
    const res = await api.get(`/sintomas/nombre/${nombre}`);
    return res.data;
  },

  // 🔎 Buscar por palabra clave
  buscarPorPalabraClave: async (palabra) => {
    const res = await api.get(`/sintomas/buscar/${palabra}`);
    const sintomas = res.data;
    const asociaciones = SintomaService._getAsociacionesLocal();

    return sintomas.map((s) => ({
      ...s,
      enfermedadesAsociadas: asociaciones[s.idSintoma] || [],
    }));
  },
};

export default SintomaService;