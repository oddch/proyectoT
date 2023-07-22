import axios from "./axiosConfig.js";
import Cookies from "js-cookie";

export default {
  getTravelsUser(userId) {

    const paramsData = {
      user: userId,
      tipos_viajes: 'Manuales',
    }; 
    return axios.post('/viajes/findViajes2', paramsData)
    
  },
};