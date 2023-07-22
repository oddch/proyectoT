import axios from "./axiosConfig.js";

export default {
  getDevicesCompany(companyId) {
    const paramsData = {
      user: companyId,
      rol: "Empresa",
    };

    return axios.get("/device/findMyDevicesCompany2", {
      params: paramsData,
    });
  },

  assignDevice(data) {
    //     deviceId:645ffca1524281ad42b7cecd
    // userId:645fff4099dec4d94632c5bc
    
    return axios.put("/device/asignarDispositivo", data);
  },

  updateDevice(data) {
    //     device:Dispositivo de prueba
    // id:643f2068e673cd37c90876c6
    // nroImei:867325048230135
    // type:Vehiculo
    // userId:5d7b033e2d854d2da428ca0f
    // id_tipo_vehiculo:643adb7f180420c4805428ea
    // no_placa:CKG-716
    // modelo:2023
    // kilometraje_inicial:100
    // seguimiento_metros:10
    // serial:0
    // tipo_servicio:Privado
    // defaultDevice:false
    // update:true
    return axios.put("/device/update", data);
  },

  createDevice(data) {
    //     device:0. Por asignar
    // defaultDevice:true
    // nroImei:0
    // type:0. Por asignar
    // userId:5d521fb7385a141f2cceacd5
    // id_tipo_vehiculo:643adb7f180420c4805428ea
    // no_placa:0. Por asignar
    // modelo:1990
    // kilometraje_inicial:0
    // seguimiento_metros:0
    // serial:0
    // tipo_servicio:0. Por asignar
    return axios.post("/device/add2", data);
  },

  getVehicles(type, cl) {
    const data = { tipo: type, clase: cl };
    return axios.post("/tipos_vehiculos/find", data);
  },

  getTypesVehicle() {
    return axios.get("/tipos_vehiculos/findTipos");
  },
  getClassesVehicle() {
    return axios.get("/tipos_vehiculos/findClases");
  },
};
