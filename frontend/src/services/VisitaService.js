import api from "./api";

const VisitaService = {
  listar: async () => {
    const res = await api.get("/visitas");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/visitas", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/visitas/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/visitas/${id}`);
  },

  buscarPorPaciente: async (idPaciente) => {
    const res = await api.get(`/visitas/paciente/${idPaciente}`);
    return res.data;
  },

  buscarPorEstado: async (estado) => {
    const res = await api.get(`/visitas/estado/${estado}`);
    return res.data;
  },
};

export default VisitaService;