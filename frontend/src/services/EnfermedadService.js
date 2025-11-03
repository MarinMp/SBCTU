import api from "./api";

const EnfermedadService = {
  listar: async () => {
    const res = await api.get("/enfermedades");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/enfermedades", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/enfermedades/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/enfermedades/${id}`);
  },

  buscarPorCodigo: async (codigo) => {
    const res = await api.get(`/enfermedades/codigo/${codigo}`);
    return res.data;
  },

  buscarPorCategoria: async (categoria) => {
    const res = await api.get(`/enfermedades/categoria/${categoria}`);
    return res.data;
  },
};

export default EnfermedadService;