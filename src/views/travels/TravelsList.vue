<template >
    <div class="w-full py-16 px-10">
        <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
        <h2 class="text-3xl text-center text-primary-100 font-bold">VIAJES</h2>
        <div class="text-center mx-auto pt-8 pb-24">
            <button type="button" @click="goToCreateTravel"
                class="text-white bg-gradient-to-r from-tertiary-100 via-tertiary-200 to-tertiary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Crear viaje
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
                                        NOMBRE DEL USUARIO
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        N0 VIAJE
                                    </th>

                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        CALIFICACION
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        CIUDAD
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        KILOMETROS REALIZADOS
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        FECHA
                                    </th>

                                    <th scope="col" class="px-4 py-3 text-left">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="travel in travels" :key="travel.travel">
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.device }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.no_viaje }}
                                        </p>
                                    </td>

                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.calificacion}}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.municipio_inicial }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.kilometros }}
                                        </p>
                                    </td>
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">

                                        <p class="text-body2 text-gray-2 truncate">
                                            {{ travel.fecha   }}
                                        </p>
                                    </td>


                                    <td class="whitespace-nowrap text-left border-t border-tertiary-200 px-6 py-4">
                                        <el-tooltip class="item" effect="dark" content="Editar información"
                                            placement="top-start">
                                            <button @click="openEditTravelModal(travel)"
                                                style="background: none;  border: none; cursor: pointer;">
                                                <el-icon :size="24" color="#79BDB1">
                                                    <Edit />
                                                </el-icon>
                                            </button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Asignar usuario"
                                            placement="top-start">
                                            <button @click="openAssignUserModal(travel)" class="ml-4"
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

        <div v-if="travelToEdit">
            <el-dialog v-model="editTravel" :before-close="closeEditTravelModal">
                <Form class="mx-auto w-full" @updateData="updateData" :company="travelToEdit" nameRef="edit-travel" />
            </el-dialog>
            <el-dialog v-model="assignUser" :before-close="closeEditTravelModal" title="Asignar viaje">
                <form-assign-travel class="mx-auto w-full" :travel="travelToEdit" nameRef="assign-travel" />
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { ElButton, ElDialog } from 'element-plus';
import Form from '../../components/FormTravel.vue';
import FormAssignTravel from '../../components/FormAssignTravel.vue';
import auth from "@/logic/auth";
import travels from "@/logic/travels";

export default {

    components: {
        ElButton,
        ElDialog,
        Form,
        Loading,
        FormAssignTravel
    },
    data() {
        return {
            isLoading: false,
            editTravel: false,
            assignUser: false,
            userId: null,
            travelToEdit: null,
            travels: [],

        }
    },
    mounted() {

        

        this.getTravels()
    },
    methods: {
        openEditTravelModalModal(user) {
            this.editTravel = true
            this.travelToEdit = user
        },
        openAssignUserModal(user) {
            this.assignUser = true
            this.travelToEdit = user
        },
        closeEditTravelModal() {
            this.editTravel = false
            this.assignUser = false
            this.travelToEdit = null
            this.getTravels()
        },
        goToCreateTravel() {
            this.$router.push({ name: 'Travel-create' })
        },
        getTravels() {

            var data = {
                company: this.companyId,
                type: "Normal"
            }
            this.isLoading = true
            travels.getTravelsCompany(this.companyId).then((result) => {


                this.travels = result.data.data;
                this.isLoading = false
                // this.users.push(result.data)

            }).catch((err) => {

            });
        },
        updateData(newdata) {
            const index = this.travels.findIndex(
                (travel) => travel._id === newdata.id
                );
                
                if (index !== -1) {
                this.travels.splice(index, 1, newdata);
                }
            this.closeEditTravelModal()
        }
    },
}
</script>
