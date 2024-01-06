<template>
        <h1>List Travels</h1>
        <a :href="`/${locale}/admin/travel/create`">add Travel</a>
        <a :href="`/${locale}/admin/travel/1`">Edit Travel 1</a>
</template>
    
<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();
</script>
    
<style></style>