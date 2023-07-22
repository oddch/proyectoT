<template>
  <div class="relative w-full h-screen flex">
    <span v-if="!showNavbar" class="absolute text-white text-4xl top-5 right-4 cursor-pointer z-50"
        @click="showNavbar = true"
      >
      <div class="bi bi-filter-left px-2 bg-gray-900 rounded-md">
        <el-icon size="30"><Expand /></el-icon>
      </div>
    </span>
    <Sidebar v-if="!this.$route.meta.hideNav && showNavbar" class="w-60 side-bar z-50" @show-nav="showNavbar = false"/>
    <RouterView class="w-full"/>
  </div>
</template>
<script >
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
export default {
  components: {
    Navbar,
    Sidebar
  },
  data() {
      return {
        showNavbar: true,
      }
  },
  created (){
    if (window.innerWidth < 768){
      this.showNavbar = false
    }
  }
}

</script>
<style scoped>
@media (max-width: 768px) {
  .side-bar {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

