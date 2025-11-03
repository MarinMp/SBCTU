import api from "./api";

const TriageService = {
  listar: async () => {
    const res = await api.get("/triages");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/triages", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/triages/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/triages/${id}`);
  },

  buscarPorMedico: async (idMedico) => {
    const res = await api.get(`/triages/medico/${idMedico}`);
    return res.data;
  },

  buscarPorNivel: async (idNivel) => {
    const res = await api.get(`/triages/nivel/${idNivel}`);
    return res.data;
  },
};

export default TriageService;