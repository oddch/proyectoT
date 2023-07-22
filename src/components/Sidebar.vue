<template>
  <div
    class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-gray-800"
  >
    <div class="fixed flex flex-col top-0 left-0 w-60 bg-gray-900 h-full">
      <div
        class="flex items-center justify-between h-14 border-b px-4 bg-primary-25"
      >
        <RouterLink to="/">
          <div class="flex items-center">
            <img class="h-8 mr-2" src="../assets/logo_solo.png" alt="Logo" />
            <p class="text-primary-200 font-semibold">PROTEGOS S.A.S</p>
            <!-- <img class="h-8" src="../assets/name.png" alt="Name"> -->
          </div>
        </RouterLink>
        <div @click="closeSidebar()" class="lg:hidden">
          <el-icon size="20"><Close /></el-icon>
        </div>
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li class="px-5">
            <div class="flex flex-row items-center h-8">
              <div class="text-sm font-light tracking-wide text-gray-200">
                Menu
              </div>
            </div>
          </li>
          <div v-for="(option, index) in menuOptions" :key="option.name">
            <li class="px-5" v-if="index == menuOptions.length - 1">
              <div class="flex flex-row items-center h-8">
                <div class="text-sm font-light tracking-wide text-gray-200">
                  Configuración
                </div>
              </div>
            </li>
            <li>
              <RouterLink
                :to="option.path"
                :class="
                  this.$route.path == option.path
                    ? 'text-primary-200 font-semibold bg-primary-25 border-l-4 border-primary-100 hover:text-gray-100'
                    : ''
                "
                class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-250 text-gray-200 hover:text-gray-100 border-l-4 border-transparent hover:border-tertiary-100 pr-6"
              >
                <span class="inline-flex justify-center items-center ml-4">
                  <el-icon
                    size="20"
                    :color="
                      this.$route.path == option.path ? '#3062ff' : '#8FC2D2'
                    "
                  >
                    <MapLocation v-if="option.path === '/'" />
                    <OfficeBuilding v-if="option.path === '/companies'" />
                    <Van v-if="option.path === '/devices'" />
                    <User v-if="option.path === '/users'" />
                    <SwitchButton v-if="option.path === '/login'" />
                  </el-icon>
                </span>
                <span
                  class="ml-2 text-sm tracking-wide truncate"
                  :class="
                    this.$route.path == option.path
                      ? 'text-primary-200 font-semibold hover:text-gray-800'
                      : ''
                  "
                  >{{ option.name }}</span
                >
              </RouterLink>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import auth from "@/logic/auth";

export default {
  data() {
    return {
      rol: "Admin",
      menuOptions: [],
      menuOpen: true,
    };
  },
  mounted() {
    var user = auth.getUserLogged();
    if (user != null) {
      this.rol = user.rol;
      this.menuOptions = [{ path: "/", name: "Home" }];
      if (user.admin && this.rol == "Normal") {
        this.menuOptions = [
          ...this.menuOptions,
          { path: "/companies", name: "Compañias" },
        ];
      } else if (this.rol == "Empresa") {
        this.menuOptions = [
          ...this.menuOptions,
          { path: "/users", name: "Usuarios" },
          { path: "/devices", name: "Dispositivos" },
          { path: "/travels", name: "Viajes" },
        ];
      }
      this.menuOptions = [
        ...this.menuOptions,
        { path: "/login", name: "Cerrar Sesión" },
      ];
    }
  },
  methods: {
    logout() {
      auth.logout();
    },
    dropdown() {
      document.querySelector("#submenu").classList.toggle("hidden");
      document.querySelector("#arrow").classList.toggle("rotate-0");
    },
    closeSidebar() {
      this.$emit("show-nav");
    },
  },
};
</script>
