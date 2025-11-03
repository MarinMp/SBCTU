import api from "./api";

const SintomaService = {
  listar: async () => {
    const res = await api.get("/sintomas");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/sintomas", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/sintomas/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/sintomas/${id}`);
  },

  buscarPorNombre: async (nombre) => {
    const res = await api.get(`/sintomas/nombre/${nombre}`);
    return res.data;
  },

  buscarPorPalabraClave: async (palabra) => {
    const res = await api.get(`/sintomas/buscar/${palabra}`);
    return res.data;
  },
};

export default SintomaService;