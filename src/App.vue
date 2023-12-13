<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'
import HeaderNavbar from "@/components/HeaderNavbar.vue";
</script>

<template>
  <header>
    <HeaderNavbar></HeaderNavbar>
<!--    <img alt="Vue logo" class="logo" src="@/assets/logov.svg" width="125" height="125" />


    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    </div>-->

  </header>

  <RouterView />
</template>

<style scoped>
body {
  font-family: "Heebo", Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
}
</style>
