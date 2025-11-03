import api from "./api";

const DiagnosticoService = {
  listar: async () => {
    const res = await api.get("/diagnosticos");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/diagnosticos", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/diagnosticos/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/diagnosticos/${id}`);
  },

  buscarPorTipo: async (tipo) => {
    const res = await api.get(`/diagnosticos/tipo/${tipo}`);
    return res.data;
  },

  buscarPorTriage: async (idTriage) => {
    const res = await api.get(`/diagnosticos/triage/${idTriage}`);
    return res.data;
  },

  buscarPorMedico: async (idMedico) => {
    const res = await api.get(`/diagnosticos/medico/${idMedico}`);
    return res.data;
  },

  buscarPorEnfermedad: async (idEnfermedad) => {
    const res = await api.get(`/diagnosticos/enfermedad/${idEnfermedad}`);
    return res.data;
  },
};

export default DiagnosticoService;