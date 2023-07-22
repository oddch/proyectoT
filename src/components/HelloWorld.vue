<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="justify-center md:container md:mx-auto">
    <h1 class="text-xl">{{ msg }}</h1>
    <div class="">
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener" class="text-xl">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </div>
  </div>
</template>

<style scoped>

</style>
