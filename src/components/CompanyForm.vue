<template>
    <div id="form-company" class="flex flex-col p-6 bg-white w-2/3 shadow-xl rounded-2xl"> 
        <p class="mb-6 text-lg text-primary-200 font-semibold bg-primary-25 -m-5 px-6 py-3 rounded-t-xl">
           {{ company == null ? 'Crear Compañía:' :' Editar Compañía:' }}
        </p>
        <el-form :model="ruleForm" :rules="rules" :ref="nameRef">
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="firstName" class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Nombre 
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.firstName" placeholder="Nombre" />
                </el-form-item>
                <el-form-item prop="lastName" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Apellido 
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.lastName" placeholder="Apellido" />
                </el-form-item>
            </div>
            <div class="w-full">
                <div class="text-sm text-gray-900 font-semibold mb-2">
                    Correo electrónico 
                    <span v-if="company == null" class="text-primary-200">*</span> 
                </div>
                <el-form-item prop="email" class="w-full">
                    <el-input v-model="ruleForm.email" placeholder="Correo electronico" />
                </el-form-item>
            </div>
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="userName" class="w-full" :class="{' lg:w-1/2 lg:mr-2' : company == null}">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Nombre de usuario 
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.userName" placeholder="Nombre de usuario" />
                </el-form-item>
                <el-form-item v-if="company == null" prop="password" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Contraseña
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-input v-model="ruleForm.password" type="password" placeholder="Contraseña" />
                </el-form-item>
            </div>
            <hr class="my-2 border-tertiary-100">
            <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center pt-4">
                <div>
                    <el-form-item prop="enabled" class="w-full">
                        <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
                            Habilitado
                            <span v-if="company == null" class="text-primary-200">*</span> 
                        </div>
                        <el-switch v-model="ruleForm.enabled" inline-prompt active-text="Si" inactive-text="No"/>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="notificationEmail" class="w-full">
                        <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
                            Notificación por correo
                            <span v-if="company == null" class="text-primary-200">*</span> 
                        </div>
                        <el-switch v-model="ruleForm.notificationEmail" inline-prompt active-text="Si" inactive-text="No" />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="mandatoryExpenses" class="w-full">
                        <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
                            Gastos obligatorios
                            <span v-if="company == null" class="text-primary-200">*</span> 
                        </div>
                        <el-switch v-model="ruleForm.mandatoryExpenses" inline-prompt active-text="Si" inactive-text="No" />
                    </el-form-item>
                </div>   
            </div>
            <hr class="mt-2 mb-6 border-tertiary-100">
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Fecha de expiración
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-date-picker v-model="ruleForm.expirationDate" type="date"
                        placeholder="Selecciona la fecha expiracion" clearable style="width: 100%" />
                </el-form-item>
                <el-form-item prop="region" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold mb-2">
                        Municipio
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-select v-model="ruleForm.region" filterable placeholder="Selecciona tu municipio"
                        style="width: 100%">
                        <el-option v-for="item in regions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </div>
            <div class="w-full flex flex-col lg:flex-row lg:justify-between py-4">
                <div class="w-full lg:w-1/3">
                    <span class="text-xs text-gray-400">(Máximo de usuarios en la compañia)</span> 
                    <div class="flex pt-2">
                        <div class="flex text-sm text-gray-900 font-semibold mr-4">
                            Usuarios
                            <span v-if="company == null" class="pl-1 text-primary-200">*</span> 
                        </div>
                        <el-form-item prop="enabled" class="w-full flex">
                            <el-input-number v-model="ruleForm.maxUSers" :min="1" size="small"/>
                        </el-form-item>
                    </div>  
                </div>
                <div class="w-full lg:w-1/3">
                    <span class="text-xs text-gray-400">(Cantidad metros para hacer seguimiento)</span> 
                    <div class="flex pt-2">
                        <div class="flex text-sm text-gray-900 font-semibold mr-4">
                            Metros
                            <span v-if="company == null" class="pl-1 text-primary-200">*</span> 
                        </div>
                        <el-form-item prop="notificationEmail" class="w-full">
                            <el-input-number v-model="ruleForm.trackingMeters" :min="1" size="small"/>
                        </el-form-item>
                    </div>
                </div>
                <div class="w-full lg:w-1/3">
                    <span class="text-xs text-gray-400">(Minutos para detectar un viaje automático)</span> 
                    <div class="flex pt-2">
                        <div class="flex text-sm text-gray-900 font-semibold mr-4">
                        Minutos
                            <span v-if="company == null" class="pl-1 text-primary-200">*</span> 
                        </div>
                        <el-form-item prop="mandatoryExpenses" class="w-full">
                            <el-input-number v-model="ruleForm.travelMinutes" :min="1" size="small"/>
                        </el-form-item>    
                    </div> 
                </div>
            </div>
            <div class="w-full flex flex-col lg:flex-row">
                <el-form-item prop="companyType" class="w-full lg:w-1/2 lg:mr-2">
                    <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
                        Tipo de compañia
                        <span v-if="company == null" class="text-primary-200">*</span> 
                    </div>
                    <el-select v-model="ruleForm.companyType" placeholder="Selecciona un tipo de compania"
                        style="width: 100%">
                        <el-option v-for="company in companyTypeOptions" :key="company.value" :label="company.label"
                            :value="company.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="travelType" class="w-full lg:w-1/2 lg:ml-2">
                    <div class="text-sm text-gray-900 font-semibold my-2 mr-4">
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
                <button type="button" @click="company != null ? updateForm(ruleForm) : submitForm(ruleForm)"
                    class="text-white bg-primary-200 hover:bg-primary-100 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    {{ company != null ? 'Actualizar' : 'Guardar' }}
                </button>
            </div>
        </el-form>
        <el-alert v-if="isSucces" title="success alert" type="success" center show-icon />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import companies from "../logic/companies";

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
        regions: {
            default: []
        },
        company: {
            default: null
        },
    },
    data() {
        return {
            regionsArray: [],
            isSucces: false,
            ruleForm: {
                firstName: '',
                lastName: '',
                email: '',
                region: '',
                enabled: true,
                password: '',
                notificationEmail: true,
                expirationDate: '',
                maxUSers: '',
                userName: '',
                travelType: '',
                travelMinutes: '',
                trackingMeters: '',
                mandatoryExpenses: true,
                companyType: ''
            },
            companyTypeOptions: [{ label: 'Flota de transporte', value: 'Flota de transporte' },
            { label: 'Empresa enseñanza', value: 'Empresa enseñanza' },
            { label: 'Gratis', value: 'Gratis' },
            { label: 'Empresa de proteccion', value: 'Empresa de proteccion' }
            ],
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
                expirationDate: [
                    {

                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
                maxUSers: [
                    {
                        required: true,
                        message: 'digite el numero de usuarios de su compañia',
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
                travelMinutes: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
                trackingMeters: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
                mandatoryExpenses: [
                    {
                        required: true,
                        message: 'Por favor ingresa tu nombre',
                        trigger: 'blur',
                    },

                ],
                companyType: [
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
        this.regionsArray = this.regions
        if (this.company) {
            this.ruleForm.firstName = this.company.firstName
            this.ruleForm.lastName = this.company.lastName
            this.ruleForm.password = this.company.password
            this.ruleForm.email = this.company.email
            this.ruleForm.enabled = this.company.enabled
            this.ruleForm.notificationEmail = this.company.notificacioncorreo
            this.ruleForm.expirationDate = this.company.expiration_date
            this.ruleForm.maxUSers = this.company.maxUsers
            this.ruleForm.userName = this.company.user
            this.ruleForm.region = this.company.id_region
            this.ruleForm.email = this.company.notificationEmail
            this.ruleForm.trackingMeters = this.company.seguimiento_metros
            this.ruleForm.travelType = this.company.tipos_viajes
            this.ruleForm.travelMinutes = this.company.no_minutos_viaje
            this.ruleForm.mandatoryExpenses = this.company.gastos_obligatorio
            this.ruleForm.companyType = this.company.tipoCompania
        }
    },
   
    methods: {
        saveCustomer() {
            console.log('Información del compania guardada:', this.ruleForm);
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
                        notificacioncorreo: this.ruleForm.notificationEmail ? 'Si' : 'No',
                        expiration_date: this.ruleForm.expirationDate,
                        maxUsers: this.ruleForm.maxUSers ?? '0',
                        type: 'Empresa',
                        user: this.ruleForm.userName,
                        id_region: this.ruleForm.region,
                        notificationEmail: this.ruleForm.email,
                        seguimiento_metros: this.ruleForm.trackingMeters ?? '0',
                        tipos_viajes: this.ruleForm.travelType ,
                        no_minutos_viaje: this.ruleForm.travelMinutes ?? '0',
                        gastos_obligatorio: this.ruleForm.mandatoryExpenses ? 'Si' : 'No',
                        tipoCompania: this.ruleForm.companyType,
                    };
                    console.log(data);
                    companies.createCompany(data)
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
                        userId: this.company._id,
                        firstName: this.ruleForm.firstName,
                        lastName: this.ruleForm.lastName,
                        password: this.ruleForm.password,
                        email: this.ruleForm.email,
                        enabled: this.ruleForm.enabled,
                        notificacioncorreo: this.ruleForm.notificationEmail ? 'Si' : 'No',
                        expiration_date: this.ruleForm.expirationDate,
                        maxUsers: this.ruleForm.maxUSers,
                        type: 'Empresa',
                        user: this.ruleForm.userName,
                        id_region: this.ruleForm.region,
                        notificationEmail: this.ruleForm.email,
                        seguimiento_metros: this.ruleForm.trackingMeters,
                        tipos_viajes: this.ruleForm.travelType,
                        no_minutos_viaje: this.ruleForm.travelMinutes,
                        gastos_obligatorio: this.ruleForm.mandatoryExpenses ? 'Si' : 'No',
                        tipoCompania: this.ruleForm.companyType,
                    };
                    companies.updateComany(data)
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
  
<style>
.btn-primary {
    background-color: rgb(1, 75, 109);
    color: rgb(165, 183, 190);
}

.bg-form {
    background: #3e3e3eb8;
    background-size: cover;
    background-position: center;
}
.el-switch {
  --el-switch-on-color: #8FC2D2;
  --el-switch-off-color: #acacac;
}
</style>
  