<template >
    <div class="w-full py-16 px-10">
        <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
        <h2 class="text-3xl text-center text-primary-100 font-bold">DISPOSITIVOS</h2>
        <div class="text-center mx-auto pt-8 pb-24">
            <button type="button" @click="goToCreateDevice"
                class="text-white bg-gradient-to-r from-tertiary-100 via-tertiary-200 to-tertiary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Crear dispositivo
            </button>
        </div>
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div class="overflow-hidden  rounded-2xl shadow-lg">
                        <table class="min-w-full text-center text-sm font-light bg-white">
                            <thead class="font-mediu text-petroleo-100 bg-gray-100">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        NOMBRE DEL DISPOSITIVO
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        VEHICULO
                                    </th>

                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        PLACA
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        USUARIO ASIGNADO
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        TIPO DE SERVICIO
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        DISPOSITIVO POR DEFECTO
                                    </th>

                                    <th scope="col" class="px-4 py-3 text-left">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="device in devices" :key="device.device">
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.device }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.linea_vehiculo }}
                                        </p>
                                    </td>

                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.no_placa }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.firstName }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.tipo_servicio }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ device.defaultDevice ? 'SI' : 'NO' }}
                                        </p>
                                    </td>


                                    <td class="whitespace-nowrap text-left border-t border-tertiary-200 px-6 py-4">
                                        <el-tooltip class="item" effect="dark" content="Editar información"
                                            placement="top-start">
                                            <button @click="openEditDeviceModal(device)"
                                                style="background: none;  border: none; cursor: pointer;">
                                                <el-icon :size="24" color="#79BDB1">
                                                    <Edit />
                                                </el-icon>
                                            </button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Asignar usuario"
                                            placement="top-start">
                                            <button @click="openAssignUserModal(device)" class="ml-4"
                                                style="background: none; border: none; cursor: pointer;">
                                                <el-icon :size="24" color="#79BDB1">
                                                    <User />
                                                </el-icon>
                                            </button>
                                        </el-tooltip>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="deviceToEdit">
            <el-dialog v-model="editDevice" :before-close="closeEditDeviceModal">
                <Form class="mx-auto w-full" @updateData="updateData" :company="deviceToEdit" nameRef="edit-device" />
            </el-dialog>
            <el-dialog v-model="assignUser" :before-close="closeEditDeviceModal" title="Asignar dispositivo">
                <form-assign-device class="mx-auto w-full" :device="deviceToEdit" nameRef="assign-device" />
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { ElButton, ElDialog } from 'element-plus';
import Form from '../../components/FormDevice.vue';
import FormAssignDevice from '../../components/FormAssignDevice.vue';
import auth from "@/logic/auth";
import devices from "@/logic/devices";

export default {

    components: {
        ElButton,
        ElDialog,
        Form,
        Loading,
        FormAssignDevice
    },
    data() {
        return {
            isLoading: false,
            editDevice: false,
            assignUser: false,
            companyId: null,
            deviceToEdit: null,
            devices: [],

        }
    },
    mounted() {

        var user = auth.getUserLogged()
        if (user != null) {
            this.companyId = user["id"]
        }

        this.getDevices()
    },
    methods: {
        openEditDeviceModal(user) {
            this.editDevice = true
            this.deviceToEdit = user
        },
        openAssignUserModal(user) {
            this.assignUser = true
            this.deviceToEdit = user
        },
        closeEditDeviceModal() {
            this.editDevice = false
            this.assignUser = false
            this.deviceToEdit = null
            this.getDevices()
        },
        goToCreateDevice() {
            this.$router.push({ name: 'Device-create' })
        },
        getDevices() {

            var data = {
                company: this.companyId,
                type: "Normal"
            }
            this.isLoading = true
            devices.getDevicesCompany(this.companyId).then((result) => {


                this.devices = result.data.data;
                this.isLoading = false
                // this.users.push(result.data)

            }).catch((err) => {

            });
        },
        updateData(newdata) {
            const index = this.devices.findIndex(
                (device) => device._id === newdata.id
                );
                
                if (index !== -1) {
                this.devices.splice(index, 1, newdata);
                }
            this.closeEditDeviceModal()
        }
    },
}
</script>
