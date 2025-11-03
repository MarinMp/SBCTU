import api from "./api";

const PacienteService = {
  listar: async () => {
    const res = await api.get("/pacientes");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/pacientes", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/pacientes/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/pacientes/${id}`);
  },
};

export default PacienteService;