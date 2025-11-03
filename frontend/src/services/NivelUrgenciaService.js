import api from "./api";

const NivelUrgenciaService = {
  listar: async () => {
    const res = await api.get("/niveles-urgencia");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/niveles-urgencia", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/niveles-urgencia/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/niveles-urgencia/${id}`);
  },

  buscarPorCodigo: async (codigo) => {
    const res = await api.get(`/niveles-urgencia/codigo/${codigo}`);
    return res.data;
  },
};

export default NivelUrgenciaService;