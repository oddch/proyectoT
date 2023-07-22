<template>
  <div
    id="form-travels"
    class="flex flex-col p-6 bg-white w-2/3 shadow-xl rounded-2xl"
  >
    <p
      class="mb-6 text-lg text-primary-200 font-semibold bg-primary-25 -m-5 px-6 py-3 rounded-t-xl"
    >
      {{ travel == null ? "Crear Viaje:" : " Editar Viaje:" }}
    </p>
    <el-form :model="ruleForm" :rules="rules" :ref="nameRef">
      <div class="w-full flex flex-col lg:flex-row">
        <el-form-item prop="nameDevice" class="w-full lg:w-1/2 lg:mr-2">
          <div class="text-sm text-gray-900 font-semibold mb-2">
            Nombre del usuario
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input
            v-model="ruleForm.nameDevice"
            placeholder="Nombre del dispositivo"
          />
        </el-form-item>
        <el-form-item prop="mei" class="w-full lg:w-1/2 lg:ml-2">
          <div class="text-sm text-gray-900 font-semibold mb-2">
            Número mei
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.nrolmei" placeholder="Número mei" />
        </el-form-item>
      </div>
      <div class="w-full flex flex-col lg:flex-row">
        <el-form-item prop="typeDevice" class="w-full lg:w-1/2 lg:mr-2">
          <div class="text-sm text-gray-900 font-semibold mb-2">
            Tipo de dispositivo
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-select
            v-model="ruleForm.typeDevice"
            filterable
            placeholder="tipo de dispositivo"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeDeviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="typeService" class="w-full lg:w-1/2 lg:ml-2">
          <div class="text-sm text-gray-900 font-semibold mb-2">
            Tipo de servicio
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-select
            v-model="ruleForm.typeService"
            placeholder="Selecciona el tipo de servicio"
            style="width: 100%"
          >
            <el-option
              v-for="travel in typeServiceOptions"
              :key="travel.value"
              :label="travel.label"
              :value="travel.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="w-full">
        <div class="text-sm text-gray-900 font-semibold mb-2">
          Usuario
          <span v-if="travel == null" class="text-tertiary-200">*</span>
        </div>
        <el-form-item prop="userId" class="w-full" v-if="travel == null">
          <el-select
            v-model="ruleForm.userId"
            filterable
            placeholder="Usuario"
            style="width: 100%"
          >
            <el-option
              v-for="item in usersOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <hr class="my-2 border-tertiary-100" />
      <div class="w-full pt-4">
        <el-form-item prop="enabled" class="w-full">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Dispositivo por defecto
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-switch
            v-model="ruleForm.defaultDevice"
            inline-prompt
            active-text="Si"
            inactive-text="No"
          />
        </el-form-item>
      </div>
      <hr class="mt-2 mb-6 border-tertiary-100" />
      <div
        class="w-full flex flex-col lg:flex-row"
        v-if="ruleForm.typeDevice == 'Vehiculo'"
      >
        <el-form-item
          prop="typeVehiclerefilter"
          class="w-full lg:w-1/2 lg:mr-2"
        >
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Tipo de vehículo
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-select
            v-model="typeVehiclerefilter"
            filterable
            placeholder="tipo de vehiculo"
            style="width: 100%"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="classesVehiclerefilter"
          class="w-full lg:w-1/2 lg:ml-2"
        >
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Clase de vehículo
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-select
            v-model="classesVehiclerefilter"
            placeholder="Selecciona una clase"
            style="width: 100%"
          >
            <el-option
              v-for="travel in classesOptions"
              :key="travel.value"
              :label="travel.label"
              :value="travel.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="w-full flex flex-col lg:flex-row">
        <el-form-item
          prop="typeVehicle"
          class="w-full"
          v-if="
            this.typeVehiclerefilter != '' && this.classesVehiclerefilter != ''
          "
        >
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Vehículo
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-select
            v-model="ruleForm.typeVehicle"
            filterable
            placeholder="vehiculo"
            style="width: 100%"
          >
            <el-option
              v-for="item in VehiclesOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div
        class="w-full flex flex-col lg:flex-row"
        v-if="ruleForm.typeDevice == 'Vehiculo'"
      >
        <el-form-item prop="plateNumber" class="w-full lg:w-1/2 lg:mr-2">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Nro placa
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.plateNumber" placeholder="NFD232" />
        </el-form-item>
        <el-form-item prop="modelVehicle" class="w-full lg:w-1/2 lg:ml-2">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Modelo
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.modelVehicle" placeholder="Modelo" />
        </el-form-item>
      </div>
      <div
        class="w-full flex flex-col lg:flex-row"
        v-if="ruleForm.typeDevice == 'Vehiculo'"
      >
        <el-form-item prop="initialKmVehicle" class="w-full lg:w-1/3 lg:mr-2">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Kilometraje inicial
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.initialKmVehicle" placeholder="1200" />
        </el-form-item>
        <el-form-item prop="trackingInMeters" class="w-full lg:w-1/3 lg:mr-2">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Seguimiento en mts
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.trackingInMeters" placeholder="500" />
        </el-form-item>
        <el-form-item prop="serialVehicle" class="w-full lg:w-1/3">
          <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
            Serial
            <span v-if="travel == null" class="text-tertiary-200">*</span>
          </div>
          <el-input v-model="ruleForm.serialVehicle" placeholder="Serial" />
        </el-form-item>
      </div>
      <div class="text-center mx-auto">
        <button
          type="button"
          @click="travel != null ? updateForm(ruleForm) : submitForm(ruleForm)"
          class="text-white bg-primary-200 hover:bg-primary-100 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          {{ travel != null ? "Actualizar" : "Guardar" }}
        </button>
      </div>
    </el-form>
    <el-alert
      v-if="isSucces"
      title="success alert"
      type="success"
      center
      show-icon
    />
  </div>
</template>
<style>
.label-left .el-form-item__label {
  text-align: left;
}
</style>
<script>
import auth from "@/logic/auth";
import { defineComponent } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import user from "../logic/user";
import device from "@/logic/devices";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  props: {
    nameRef: {
      default: "",
    },
    travel: {
      default: null,
    },
  },
  data() {
    return {
      isSucces: false,
      companyId: null,
      typeVehiclerefilter: "",
      classesVehiclerefilter: "",
      typeOptions: [],
      classesOptions: [],
      VehiclesOptions: [],
      usersOptions: [],
      typeDeviceOptions: [
        { label: "Diadema", value: "Diadema" },
        { label: "Vehiculo", value: "Vehiculo" },
        {
          label: "Dispositivo distracciones",
          value: "Dispositivo distracciones",
        },
        { label: "Botón de pánico", value: "Botón de pánico" },
      ],
      typeServiceOptions: [
        { label: "Privado", value: "Privado" },
        { label: "Público", value: "Publico" },
      ],
      rules: {
        nameDevice: [
          {
            required: true,
            message: "Por favor ingresa un nombre al dispositivo",
            trigger: "blur",
          },
        ],
        typeDevice: [
          {
            required: true,
            message: "Elige un tipo un dispositivo",
            trigger: "blur",
          },
        ],

        typeVehicle: [
          {
            required: true,
            message: "Elige un vehiculo",
            trigger: "blur",
          },
        ],
        plateNumber: [
          {
            required: true,
            message: "Digita una placa",
            trigger: "blur",
          },
        ],
        modelVehicle: [
          {
            required: true,
            message: "Digita el modelo del dispositivo",
            trigger: "blur",
          },
        ],
        typeService: [
          {
            required: true,
            message: "Elige el tipo de servicio",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "Elige un usuario",
            trigger: "blur",
          },
        ],
      },
      ruleForm: {
        nameDevice: "",
        defaultDevice: true,
        nrolmei: "",
        typeDevice: "",
        userId: "",
        typeVehicle: "",
        plateNumber: "",
        modelVehicle: "",
        initialKmVehicle: "",
        trackingInMeters: "",
        serialVehicle: "",
        typeService: "",
      },
    };
  },
  watch: {
    classesVehiclerefilter: {
      handler() {
        if (
          this.typeVehiclerefilter != "" &&
          this.classesVehiclerefilter != ""
        ) {
          this.getVehicles();
        }
      },
      immediate: false,
    },
  },
  mounted() {
    var user = auth.getUserLogged();
    if (user != null) {
      this.companyId = user["id"];
    }
    if (this.companyId != null) {
      this.getUSers();
      this.getType();
      this.getClases();
    }
    if (this.company) {
      console.log(this.company);
      this.ruleForm.nameDevice = this.company.device;
      this.ruleForm.defaultDevice = this.company.defaultDevice;
      this.ruleForm.nrolmei = this.company.nro_imei;
      this.ruleForm.typeDevice = this.company.type;
      this.ruleForm.userId = this.company.userId;
      this.ruleForm.typeVehicle = this.company.id_tipo_vehiculo;
      this.ruleForm.plateNumber = this.company.no_placa;
      this.ruleForm.modelVehicle = this.company.modelo;
      this.ruleForm.initialKmVehicle = this.company.kilometraje_inicial;
      this.ruleForm.trackingInMeters = this.company.seguimiento_metros;
      this.ruleForm.serialVehicle = this.company.serial;
      this.ruleForm.typeService = this.company.tipo_servicio;
    }
  },
  methods: {
    getVehicles() {
      device
        .getVehicles(this.typeVehiclerefilter, this.classesVehiclerefilter)
        .then((result) => {
          this.VehiclesOptions = [];
          this.VehiclesOptions = result.data.data.map(function (vehicle) {
            return { label: vehicle.linea, value: vehicle._id };
          });
        })
        .catch((err) => {});
    },
    saveCustomer() {
      console.log("Información del dispositivo guardada:", this.ruleForm);
    },
    submitForm() {
      this.$refs[this.nameRef].validate((valid) => {
        if (valid) {
          this.saveCustomer();
          var data = {
            device: this.ruleForm.nameDevice,
            defaultDevice: this.ruleForm.defaultDevice ? "true" : "false",
            nroImei: this.ruleForm.nrolmei,
            type: this.ruleForm.typeDevice,
            userId: this.ruleForm.userId,
            id_tipo_vehiculo:
              this.ruleForm.typeVehicle != ""
                ? this.ruleForm.typeVehicle
                : "643adb7f180420c4805428ea",
            no_placa: this.ruleForm.plateNumber ?? "0",
            modelo: this.ruleForm.modelVehicle ?? "0",
            kilometraje_inicial: this.ruleForm.initialKmVehicle ?? "0",
            seguimiento_metros: this.ruleForm.trackingInMeters ?? "0",
            serial: this.ruleForm.serialVehicle ?? "0",
            tipo_servicio: this.ruleForm.typeService,
          };

          console.log(data);
          device.createDevice(data);
          // this.$emit('save', this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateForm() {
      this.$refs[this.nameRef].validate((valid) => {
        if (valid) {
          this.saveCustomer();
          var data = {
            id: this.company._id,
            device: this.ruleForm.nameDevice,
            defaultDevice: this.ruleForm.defaultDevice ? "true" : "false",
            nroImei: this.ruleForm.nrolmei,
            type: this.ruleForm.typeDevice,
            userId: this.ruleForm.userId,
            id_tipo_vehiculo: this.ruleForm.typeVehicle,
            no_placa: this.ruleForm.plateNumber ?? "0",
            modelo: this.ruleForm.modelVehicle ?? "0",
            kilometraje_inicial: this.ruleForm.initialKmVehicle ?? "0",
            seguimiento_metros: this.ruleForm.trackingInMeters ?? "0",
            serial: this.ruleForm.serialVehicle ?? "0",
            tipo_servicio: this.ruleForm.typeService,
            update: true,
          };

          device.updateDevice(data);
          this.$emit("updateData", data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    getUSers() {
      user
        .getUsers(this.companyId)
        .then((result) => {
          this.usersOptions = result.data.data.map(function (user) {
            return {
              label: user.firstName,
              value: user._id,
            };
          });
        })
        .catch((err) => {});
    },
    getType() {
      device
        .getTypesVehicle()
        .then((result) => {
          this.typeOptions = result.data.data.map(function (type) {
            return {
              label: type._id,
              value: type._id,
            };
          });
        })
        .catch((err) => {});
    },
    getClases() {
      device
        .getClassesVehicle()
        .then((result) => {
          this.classesOptions = result.data.data.map(function (classV) {
            return {
              label: classV._id,
              value: classV._id,
            };
          });
        })
        .catch((err) => {});
    },
  },
});
</script>
