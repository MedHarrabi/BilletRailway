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
</style>
