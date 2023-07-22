<template>
    <div class="w-full py-8 px-10 bg-form">
        <div @click="goToListCompanies" class="flex items-center text-primary-100 cursor-pointer">
            <el-icon size="30"><ArrowLeftBold /></el-icon>
            <span class="text-primary-200 font-semibold text-lg ml-2">Listar compañias</span>
        </div>
    
        <h2 class="text-3xl text-center text-primary-300 font-bold mb-8">Nueva Compañia</h2>
        <div class="flex justify-center mb-16">
            <Form class="mx-auto " :regions="regions" />
        </div>
    </div>
</template>
<style>
.bg-form {
    background-image: url("../../assets/fondo.jpg");
    background-size: cover;
    background-position: center;
    height: fit-content;
}
</style> 
<script>
import companies from "@/logic/companies";

import Form from '../../components/CompanyForm.vue';

export default {
    components: {
        Form
    },
    data: () => ({
        regions: [],
        value: null,
    }),
    mounted() {
        this.getRegions()
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
        goToListCompanies() {
            this.$router.replace("/companies")
        }

    },
}
</script>