<script setup>
import { RouterView } from 'vue-router';
import HeaderNavbar from "@/components/HeaderNavbar.vue";
</script>

<template>
  <div class="wrapper">
    <HeaderNavbar></HeaderNavbar>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
body {
  /* TO HERE 👇 */
  font-family: "Heebo", Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}

.wrapper {
  background-image: url('./assets/background.jpeg'); 
  background-size: 100%; 
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
