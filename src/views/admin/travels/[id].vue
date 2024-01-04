<template>
    <h1>Edit travel {{ route.params?.id }} </h1>
</template>
    
<script setup lang='ts'>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const travel_id = ref()

onMounted(() => {
    travel_id.value = route.params.id
})
</script>
    
<style></style>