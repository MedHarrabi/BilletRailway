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
  background-image: url('./assets/background.jpeg'); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
  background-size: cover; /* Ensures the image covers the entire container */
  background-position: center; /* Centers the image within the container */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  min-height: 100vh;
}
</style>
