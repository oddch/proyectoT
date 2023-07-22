<template>
    <div class="w-full py-8 px-10 bg-form">
        <div @click="goToListDevices" class="flex items-center text-primary-100 cursor-pointer">
            <el-icon size="30"><ArrowLeftBold /></el-icon>
            <span class="text-primary-200 font-semibold text-lg ml-2">Listar dispositivos</span>
        </div>
    
        <h2 class="text-3xl text-center text-primary-300 font-bold mb-8">Nuevo Dispositivo</h2>
        <div class="flex justify-center mb-16">
            <Form class="mx-auto"/>
        </div>
    </div>
</template>

<script>

import auth from "@/logic/auth";
import Form from '../../components/FormDevice.vue';

export default {
    components: {
        Form
    },

    data: () => ({
        companyId: null,
        
    }),
    mounted() {
        var user = auth.getUserLogged()
        if (user != null) {
            this.companyId = user['id']

        }


    },

    methods: {

        goToListDevices() {
            this.$router.replace("/devices")
        },
        

    },
}
</script>