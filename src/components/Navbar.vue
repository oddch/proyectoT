<template>
  <div class="bg-gray-200 text-white w-full">
    <nav class="container px-8 py-4 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <RouterLink to="/">
          <div class="flex items-center">
            <img class="h-10" src="../assets/logo_solo.png" alt="Logo">
            <p>Protegos</p>
            <!-- <img class="h-8" src="../assets/name.png" alt="Name"> -->
          </div>
        </RouterLink>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button type="button" class="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-400">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
        :class="showMenu ? 'flex' : 'hidden'">
        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <li class="" v-for="m in menu" :key="m.name">
          <RouterLink 
            :to="m.path" 
            :class="this.$route.path == m.path ? 'text-primary-100 font-semibold' : ''"
            class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6" 
          >
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">{{ m.name }}</span>
          </RouterLink>
        </li>

        <li>
          <a href="#" class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
            <span class="inline-flex justify-center items-center ml-4">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </span>
            <span class="ml-2 text-sm tracking-wide truncate">Cerrar sesion</span>
          </a>
        </li>
      </div>

    </nav>
  </div>
</template>
<style>
.bg-gradient{
  background: linear-gradient(to right, #ffffff, #222,#222,#222)
}

</style>
<script>
import { RouterLink } from "vue-router";
import auth from "@/logic/auth";
export default {

  components: {
    RouterLink
  },
  data: () => ({ 
    showMenu: false,
    rol: 'Admin',
    menu: []
  }),
  mounted() {
    var user = auth.getUserLogged()
    if (user != null) {
      this.rol = user.rol
      this.menu = [{ path: '/', name: 'HOME' }]
      if (user.admin && this.rol == 'Normal') {

        this.menu = [...this.menu, { path: '/companies', name: 'COMPAÑIAS' }]
      } else
        if (this.rol == 'Empresa') {
          this.menu = [...this.menu, { path: '/users', name: 'USUARIOS' }, { path: '/devices', name: 'DISPOSITIVOS' }]
        }
      this.menu = [...this.menu, { path: '/login', name: 'CERRAR SESIÓN' }]
    }
  },
  methods: {
    logout() {
      auth.logout()
    },
    toggleNav: function () {
      this.showMenu = !this.showMenu;
    },
  },

};
</script>

