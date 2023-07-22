<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <loading v-model:active="isLoading" :can-cancel="true" :is-full-page="false" />
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img class="h-14" src="../assets/logo_solo.png" alt="Logo">
        <span class="text-2xl font-semibold text-gray-700">ITFUSION SAS</span>
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="text-sm text-gray-700">Usuario</span>
          <input v-model="userName" type="text" id="userName" required placeholder="Juan p"
            class="block w-full mt-1 border p-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <label class="block mt-3">
          <span class="text-sm text-black">Contraseña</span>
          <input v-model="password" type="password" id="password" required placeholder="12345"
            class="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <!-- <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div>
            <a
              class="block text-sm text-indigo-700 fontme hover:underline"
              href="#"
            >Forgot your password?</a>
          </div>
        </div> -->
        <p v-if="error" class="text-red-500 pt-3">{{ this.messageError }}</p>
        <div class="mt-6">
          <button type="submit"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>

  </div>
</template>
  
<script>
import auth from "@/logic/auth";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {
  components: {
    Loading
  },
  data: () => ({
    userName: "",
    password: "",
    error: false,
    messageError: '',
    isLoading: false,
  }),
  methods: {
    async login() {
      this.isLoading = true;
      auth.login(this.userName, this.password).then(response => {
        if (response.data.data != null) {

          localStorage.setItem('token', response.data.data.token)
          const user = {
            firstName: response.data.data.user.firstName,
            lastName: response.data.data.user.lastName,
            email: this.email,
            id: response.data.data.user._id,
            admin: response.data.data.user.admin,
            rol: response.data.data.user.rol
          };
          auth.setUserLogged(JSON.stringify(user))
          this.isLoading = false;
          console.log('llego hasta el replace')
          this.$router.replace("/");
        } else {

          this.error = true
          this.isLoading = false;
          this.messageError = response.data.message

        }


      })
        .catch(error => {

          this.error = true
          this.messageError = error
          this.isLoading = false;
        })
        .finally(() => this.loading = false);



    },
    async getDevices() {
      auth.getDevices().then(response => {

      })
    }
  }
};
</script>
  