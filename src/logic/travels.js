import axios from "./axiosConfig.js";

export default {
  getTravelsCompany(userId) {
    const paramsData = {
      userId,
      tipos_viajes: "Manuales",
    };
    return axios.post("/viajes/findViajes2", paramsData);
  },
};
