<template>
  <div class="w-full py-8 px-10 bg-user-form">
    <div
      @click="goToListUsers"
      class="flex items-center text-primary-100 cursor-pointer"
    >
      <el-icon size="30"><ArrowLeftBold /></el-icon>
      <span class="text-primary-200 font-semibold text-lg ml-2"
        >Listar usuarios</span
      >
    </div>

    <h2 class="text-3xl text-center text-primary-300 font-bold mb-8">
      Nuevo Usuario
    </h2>
    <div class="flex justify-center mb-16">
      <Form class="mx-auto" :companyId="companyId" />
    </div>
  </div>
</template>
<style>
.bg-user-form {
  background-image: url("../../assets/fondo.jpg");
  background-size: cover;
  background-position: center;
}
</style>
<script>
import companies from "@/logic/companies";
import auth from "@/logic/auth";

import Form from "../../components/FormUser.vue";

export default {
  components: {
    Form,
  },

  data: () => ({
    regions: [],
    companyId: null,
  }),
  mounted() {
    var user = auth.getUserLogged();
    if (user != null) {
      console.log("entro al if de entrar al crear usuaario");
      this.companyId = user["id"];
    }

    this.getRegions();
  },

  methods: {
    getRegions() {
      companies
        .getRegions()
        .then((result) => {
          if (result.data.data != null) {
            this.regions = result.data.data.map(function (region) {
              return { label: region.nombre_municipio, value: region._id };
            });
          }
        })
        .catch((err) => {});
    },
    goToListUsers() {
      this.$router.replace("/users");
    },
  },
};
</script>
