import api from "./api";

const PersonalMedicoService = {
  listar: async () => {
    const res = await api.get("/personal-medico");
    return res.data;
  },

  registrar: async (data) => {
    const res = await api.post("/personal-medico", data);
    return res.data;
  },

  actualizar: async (id, data) => {
    const res = await api.put(`/personal-medico/${id}`, data);
    return res.data;
  },

  eliminar: async (id) => {
    await api.delete(`/personal-medico/${id}`);
  },

  buscarPorLicencia: async (licencia) => {
    const res = await api.get(`/personal-medico/licencia/${licencia}`);
    return res.data;
  },
};

export default PersonalMedicoService;