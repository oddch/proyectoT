<template >
    <div class="w-full py-16 px-10">
        <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="true" />
        <h2 class="text-3xl text-center text-primary-100 font-bold">USUARIOS</h2>
        <div class="text-center mx-auto pt-8 pb-24">
            <button type="button" @click="goToCreateUser"
                class="text-white bg-gradient-to-r from-tertiary-100 via-tertiary-200 to-tertiary-300 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Crear usuarios
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
                                        HABILITADO
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        NOMBRE
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        EMAIL
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        MOVIL
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        TIPO DE VIAJE
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left border-tertiary-200">
                                        REGIÓN
                                    </th>
                                    <th scope="col" class="px-4 py-3 text-left">ACCIÓN</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users" :key="user.user">
                                    <td
                                        class="whitespace-nowrap text-left border-t px-6 py-4 font-medium border-tertiary-200">
                                        <el-switch v-model="user.enabled" inline-prompt active-text="Si" inactive-text="No"
                                            :disabled="true" />
                                    </td>
                                    <td
                                        class="whitespace-nowrap items-start flex md:flex-row sm:flex-col border-t px-6 py-4 border-tertiary-200">
                                        <div class="flex-shrink-0 cursor-pointer text-center">
                                            <img class="h-10 w-10 rounded-full"
                                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                                alt="user-image">
                                        </div>
                                        <div class="truncate text-left ml-2">
                                            <p class="text-body2 text-gray-2 truncate">
                                                {{ user.firstName }} {{ user.lastName }}
                                            </p>
                                            <p class="text-secondary-300 text-sm text-overline truncate">
                                                {{ user.type }}
                                            </p>
                                        </div>
                                    </td>
                                    <td class="whitespace-nowrap text-left border-t px-6 py-4 border-tertiary-200">
                                        {{ user.email }}
                                    </td>
                                    <td class="whitespace-nowrap text-left border-t px-6 py-4 border-tertiary-200">
                                        {{ user.mobile }}
                                    </td>
                                    <td class="whitespace-nowrap text-left border-t px-6 py-4 border-tertiary-200">
                                        {{ user.tipos_viajes }}
                                    </td>
                                    <td class="whitespace-nowrap text-left border-t px-6 py-4 border-tertiary-200">
                                        {{ regions.find(({ value }) => value == user.id_region)?.label }}
                                    </td>
                                    <td class="whitespace-nowrap  text-left border-t border-tertiary-200 px-6 py-4">
                                        <el-tooltip class="item" effect="dark" content="Editar información"
                                            placement="top-start">
                                            <button @click="openEditUserModal(user)"
                                                style="background: none; border: none; cursor: pointer;">
                                                <el-icon :size="24" color="#79BDB1">
                                                    <Edit />
                                                </el-icon>
                                            </button>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" content="Cambiar contraseña"
                                            placement="top-start">
                                            <button @click="openEditPasswordUserModal(user)" class="ml-4"
                                                style="background: none; border: none; cursor: pointer;">
                                                <el-icon :size="24" color="#79BDB1">
                                                    <Setting />
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

        <div v-if="userToEdit">
            <el-dialog v-model="editUser" :before-close="closeEditUserModal">
                <Form class="mx-auto w-full" @updateData="updateData" :user="userToEdit"  nameRef="update-user" />
            </el-dialog>
            <el-dialog v-model="editPasswordUser" :before-close="closeEditUserModal">
                <form-update-password class="mx-auto w-full" :user="userToEdit"  nameRef="update-password-user" />
            </el-dialog>
        </div>
      
    </div>
</template>
<script>
import user from "@/logic/user";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { ElButton, ElDialog } from 'element-plus';
import Form from '../../components/FormUser.vue';
import FormUpdatePassword from '../../components/FormUpdatePassword.vue';
import auth from "@/logic/auth";
import companies from "@/logic/companies";

export default {

    components: {
        ElButton,
        ElDialog,
        Form,
        Loading,
        FormUpdatePassword
    },
    data() {
        return {
            isLoading: false,
            editUser: false,
            editPasswordUser: false,
            companyId: null,
            userToEdit: null,
            regions: [],
            users: [

            ],
        }
    },
    mounted() {

        var user = auth.getUserLogged()
        if (user != null) {

            this.companyId = user["id"]
        }
        this.getRegions()
        this.getUsers()
    },
    methods: {
        openEditUserModal(user) {
            this.editUser = true
            this.userToEdit = user
        },
        openEditPasswordUserModal(user) {
            this.editPasswordUser = true
            this.userToEdit = user
        },
        closeEditUserModal() {
            this.editUser = false
            this.editPasswordUser = false
            this.userToEdit = null
        },
        goToCreateUser() {
            this.$router.push({ name: 'User-create' })
        },
        getUsers() {
            this.isLoading = true
            user.getUsers(this.companyId).then((result) => {
                
                this.isLoading = false
                this.users = result.data.data


            }).catch((err) => {

            });
        },
        getRegions() {
            companies.getRegions().then((result) => {
                if (result.data.data != null) {
                    this.regions = result.data.data.map(function (region) {
                        return { label: region.nombre_municipio, value: region._id };
                    });
                    console.log(this.regions[0].value)
                }

            }).catch((err) => {

            });
        },
        updateData(newdata) {
            const index = this.users.findIndex(
                (user) => user._id === newdata.userId
                );
                
                if (index !== -1) {
                this.users.splice(index, 1, newdata);
                }
            this.closeEditUserModal()
        }
    },
}
</script>
