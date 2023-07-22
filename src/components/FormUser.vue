<template>
    <div id="form-user" class="flex flex-col p-6 bg-white w-2/3 shadow-xl rounded-2xl">
        <p class="mb-6 text-lg text-primary-200 font-semibold bg-primary-25 -m-5 px-6 py-3 rounded-t-xl">
           {{ user == null ? 'Crear Usuario:' :' Editar Usuario:' }}
        </p>
        <el-form :model="ruleForm" :rules="rules" :ref="nameRef">
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="firstName" class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Nombre 
                        <span v-if="user == null" class="text-tertiary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.firstName" placeholder="Nombre" />
                </el-form-item>
                <el-form-item prop="lastName" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Apellido 
                        <span v-if="user == null" class="text-tertiary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.lastName" placeholder="Apellido" />
                </el-form-item>
            </div>
            <div class="w-full">
                <div class="text-sm text-gray-900 font-semibold mb-2">
                    Correo electrónico 
                    <span v-if="user == null" class="text-primary-200">*</span> 
                </div>
                <el-form-item prop="email" class="w-full">
                    <el-input v-model="ruleForm.email" placeholder="Correo electronico" />
                </el-form-item>
            </div>
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="userName" class="w-full" :class="{' lg:w-1/2 lg:mr-2' : user == null}">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Nombre de usuario 
                        <span v-if="user == null" class="text-tertiary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.userName" placeholder="Nombre de usuario" />
                </el-form-item>
                <el-form-item v-if="user == null" prop="password" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Contraseña
                        <span v-if="user == null" class="text-tertiary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.password" type="password" placeholder="Contraseña" />
                </el-form-item>
            </div>
            <hr class="my-2 border-tertiary-100">
            <div class="w-full pt-4">
                <el-form-item prop="enabled" class="w-full">
                    <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
                        Usuario habilitado
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-switch v-model="ruleForm.enabled" inline-prompt active-text="Si" inactive-text="No"/>
                </el-form-item>
            </div>
            <hr class="mt-2 mb-6 border-tertiary-100">

            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Municipio
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-select v-model="ruleForm.region" filterable placeholder="Selecciona el municipio" style="width: 100%">
                        <el-option v-for="item in regions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="region" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Tipo de viaje
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-select v-model="ruleForm.travelType" placeholder="Selecciona un tipo de viaje" style="width: 100%">
                        <el-option v-for="travel in travelTypeOptions" :key="travel.value" :label="travel.label"
                            :value="travel.value" />
                    </el-select>
                </el-form-item>
            </div>
            <div class="text-center mx-auto">
                <button type="button" @click="user != null ? updateForm(ruleForm) : submitForm(ruleForm)"
                    class="text-white bg-primary-200 hover:bg-primary-100 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    {{user != null ? 'Actualizar' : 'Guardar'  }}
                </button>
            </div>
        </el-form>
        <el-alert v-if="isSucces" title="success alert" type="success" center show-icon />
    </div>
</template>
<script>
import companies from "@/logic/companies";
import { defineComponent } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import user from "../logic/user";

export default defineComponent({
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
    },
    props: {
        nameRef: {
            default: '',
        },
        companyId: {
            default: null
        },
        user: {
            default: null
        }
    },
    data() {
        return {
            isSucces: false,
            regions: [],
            ruleForm: {
                firstName: '',
                lastName: '',
                email: '',
                region: '',
                enabled: true,
                password: '',
                notificationEmail: true,
                userName: '',
                travelType: '',
            },
            travelTypeOptions: [{ label: 'Automáticos', value: 'Automáticos' }, { label: 'Manuales', value: 'Manuales' }],
            rules: {
                password: [
                    {
                        required: true,
                        message: 'Por favor ingresa una contraseña',
                        trigger: 'blur',
                    },

                ],
                notificationEmail: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
               
                userName: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
                travelType: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
              
                firstName: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
                        trigger: 'blur',
                    },
                ],
                lastName: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu Apellido',
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        message: 'La longitud debe ser mayor que 1 y no debe contener espacios',
                        trigger: 'blur',
                    },
                ],
                email: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu email',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: 'Por favor ingrese un correo valido',
                        trigger: ['blur', 'change'],
                    },

                ],
                region: [
                    {
                        required: true,
                        message: 'Por favor ingresa una region',
                        trigger: 'blur',
                    },
                    {
                        min: 1,
                        message: 'La longitud debe ser mayor que 1',
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
    mounted() {
        this.getRegions()
        if (this.user) {
            console.log(this.user)
            this.ruleForm.firstName = this.user.firstName;
            this.ruleForm.lastName = this.user.lastName;
            this.ruleForm.password = this.user.password;
            this.ruleForm.email = this.user.email;
            this.ruleForm.enabled = this.user.enabled;
            this.ruleForm.userName = this.user.user;
            this.ruleForm.region = this.user.id_region;
            // this.ruleForm.email = this.user.notificationEmail;
            this.ruleForm.travelType = this.user.tipos_viajes;
        }
    },
    methods: {
        getRegions() {
            companies.getRegions().then((result) => {
                if (result.data.data != null) {
                    this.regions = result.data.data.map(function (region) {
                        return { label: region.nombre_municipio, value: region._id };
                    });

                }

            }).catch((err) => {

            });
        },
        saveCustomer() {
            console.log('Información del cliente guardada:', this.ruleForm);
        },
        submitForm() {
            this.$refs[this.nameRef].validate((valid) => {
                if (valid) {
                    this.saveCustomer();
                    var data = {
                        firstName: this.ruleForm.firstName,
                        lastName: this.ruleForm.lastName,
                        password: this.ruleForm.password,
                        email: this.ruleForm.email,
                        enabled: this.ruleForm.enabled,
                        type: 'Estandard',
                        mobile: 'No',
                        company: this.companyId,
                        user: this.ruleForm.userName,
                        id_region: this.ruleForm.region,
                        notificationEmail: this.ruleForm.email,
                        tipos_viajes: this.ruleForm.travelType,
                    };
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
                    console.log(data);
                    user.createUser(data)
                    // this.$emit('save', this.ruleForm);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        updateForm() {
            this.$refs[this.nameRef].validate((valid) => {
                if (valid) {
                    this.saveCustomer();
                    var data = {
                        userId: this.user._id,
                        firstName: this.ruleForm.firstName,
                        lastName: this.ruleForm.lastName,
                        password: this.ruleForm.password,
                        email: this.ruleForm.email,
                        enabled: this.ruleForm.enabled,
                        type: 'Estandard',
                        mobile: 'No',
                        company: this.companyId,
                        user: this.ruleForm.userName,
                        id_region: this.ruleForm.region,
                        notificationEmail: this.ruleForm.email,
                        tipos_viajes: this.ruleForm.travelType,
                    };
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
                    console.log(data);
                    user.updateUser(data)
                    this.$emit('updateData', data);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
});
</script>
  