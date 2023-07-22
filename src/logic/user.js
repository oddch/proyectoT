import axios from "./axiosConfig.js";
import qs from "qs";

export default {
  getUsers(companyId) {

    const paramsData = {
      company: companyId,
      type: 'Normal',
    }; 
    return axios.post('/auth/findMyUsers2', paramsData)
    
  },

  getRegions() {
    const body = { nombre_departamento: "TODOS" };
    return axios.post("/regiones/findRegiones", body);
  },

  updateUser(data) {
    //     userId:5d521fb7385a141f2cceacd5
    // firstName:ADMIN
    // lastName:ADMIN
    // email:omejiasq@gmail.com
    // enabled:true
    // mobile:SI
    // id_region:6432eea9ef0ca303ad4142d0
    // contactoNotificationEmail:omejiasq@gmail.com
    // contactoNotificationTelefono:+573213378481
    return axios.put("/auth/update", data);
  },

  createUser(data) {
    // user:usuarioweb
    // password:qwerty
    // firstName:Usuario
    // lastName:Web
    // email:usuarioweb@gmail.com
    // enabled:true
    // type:Estandard
    // company:5edbe79f7de6122ef0a8e832
    // mobile:NO
    // id_region:6432eea9ef0ca303ad4142d0
    // contactoNotificationEmail:omejiasq@gmail.com
    // contactoNotificationTelefono:+573213378481
    // tipos_viajes:Manuales
    axios.post("/auth/addUser2", data);
  },

  updatePassword(data) {
    //     userId:5d7b033e2d854d2da428ca0f
    // currentPassword:usuario1
    // newPassword:qwerty
    return axios.put("/auth/updatePassword", data);
  },

  getDevices(userId) {
   
    const paramsData = {
      userId: userId
    };
    
    
    return axios.get('/auth/findMyUsers', {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params : paramsData
    })
    
  },
};
