<template>
        <div class="container">
                <h1 class="title">List Travels</h1>
                <div class="cards-wrapper" v-if="travels.length">
                        <TravelCard v-for="(travel, index) in travels" :key="index" :id="travel.id" :price="travel.price"
                        :arrival_date="new Date(travel.arrival_date)" :origin_city="travel.origin_city"
                        :destination_city="travel.destination_city" :departure_date="new Date(travel.departure_date)" />
                </div>
                <div class="no-content" v-else>
                        <h1>No travels</h1>
                </div>
        </div>
</template>
    
<script setup lang='ts'>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref, Ref } from 'vue'
import axios from '../../../services/api';

import { createToaster } from "@meforma/vue-toaster";
import TravelCard from '../../../components/items/TravelCard.vue';

const toaster = createToaster();
const { t, locale } = useI18n();
const travels: Ref<any[]> = ref([])

onMounted(async () => {
        await fetchTravels()
})

const fetchTravels = async () => {
        try {
                const response = await axios.get(`/travels?`)

                if (response.status === 200) {
                        travels.value = response.data.travels as any[];
                        toaster.show(`${response.data.message}`, {
                                type: "success",
                                position: "bottom",
                        });
                } else if (response.status === 204) {
                        toaster.show(`There's not travels`, {
                                type: "warning",
                                position: "bottom",
                        });
                }
        } catch (error) {
                toaster.show(`${error.response.data.error}`, {
                        type: "error",
                        position: "bottom",
                });

        }
}
</script>
    
<style>
.cards-wrapper {
        display: flex;
        column-gap: 80px;
        row-gap: 20px;
        flex-wrap: wrap;
}

.container {
        margin-top: 0px;
  padding-inline: 130px;
}

.no-content>h1 {
        margin-top: 5rem;
        font-size: 32px;
        font-family: "Heebo", Avenir, Helvetica, Arial, sans-serif;
        color: white;
}
</style>