import axios from "./axiosConfig.js";
import Cookies from "js-cookie";

export default {
  getCompanies() {
    return axios.get("/auth/findAll");
  },

  getRegions() {
    const body = { nombre_departamento: "TODOS" };
    return axios.post("/regiones/findRegiones", body);
  },

  updateComany(data) {
    // Datos que necesita
    //     userId:5d7b02e62d854d2da428ca0e
    // password:cliente
    // firstName:cliente
    // lastName:cliente
    // email:omejiasq@gmail.com
    // enabled:true
    // notificacioncorreo:SI
    // expiration_date:2024-01-01
    // maxUsers:10
    // type:Empresa
    // id_region:6432eea9ef0ca303ad4142d0
    // notificationEmail:omejiasq@gmail.com
    // seguimiento_metros:10
    // tipos_viajes:Automáticos
    // no_minutos_viaje:5
    // gastos_obligatorio:NO
    // tipoCompania:Flota de transporte
    return axios.put("/auth/updateById", data);
  },

  createCompany(data) {
    axios.post("/auth/add", data);
  },
};
