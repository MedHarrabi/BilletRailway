<script setup lang="ts">
/* import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue' */
import TravelCard from './items/TravelCard.vue'
//import { CaTrainSpeed } from "@kalimahapps/vue-icons";
import { computed, onMounted, ref, Ref } from 'vue'
import axios from '../services/api';

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const travels: Ref<any[]> = ref([])

onMounted(async () => {
  await fetchTravels()
})

const searchForm = ref({
  origin_city: '',
  destination_city: '',
  departure_date: null as any,
  arrival_date: null as any
})

const submitSearch = async () => {
  if (searchForm.value.departure_date || searchForm.value.destination_city || searchForm.value.origin_city || searchForm.value.arrival_date) {
    await fetchTravels()
  }

}
const filters = computed(() => {
  if (searchForm.value.origin_city || searchForm.value.destination_city || searchForm.value.departure_date || searchForm.value.arrival_date) {
    let params: any = {};
    searchForm.value.origin_city ? params.origin_city = searchForm.value.origin_city : params;
    searchForm.value.destination_city ? params.destination_city = searchForm.value.destination_city : params;
    searchForm.value.departure_date ? params.departure_date = searchForm.value.departure_date : params;
    searchForm.value.arrival_date ? params.arrival_date = searchForm.value.arrival_date : params;

    return new URLSearchParams(params).toString();
  }
  return '';
});

const fetchTravels = async () => {
  try {
    const response = await axios.get(`/travels?${filters.value}`)

    if (response.status === 200) {
      travels.value = response.data.travels;
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

<template>
  <div class="container">
    <h1 class="text-slider">Book Fast</h1>
    <div class="form-wrapper">
      <VaForm ref="myForm" stateful class="mb-2 flex flex-col gap-2">
        <VaInput class="mr-5 b-dark" name="Origin City" label="Origin City" v-model="searchForm.origin_city" />
        <VaInput class="b-dark" name="Destination City" label="Destination City" v-model="searchForm.destination_city" />
        <VaDateInput class="mr-5 b-dark" name="Departure Date" label="Departure Date"
          v-model="searchForm.departure_date" />
        <VaDateInput class="b-dark" name="Arrival Date" label="Arrival Date" v-model="searchForm.arrival_date" />
        <VaButton type="submit" @click="submitSearch()" class="mt-4 w-full">
          Search
          <!-- <CaTrainSpeed  class="ml-5"/> -->
        </VaButton>
      </VaForm>
    </div>
    <div class="cards-wrapper" v-if="travels.length">
      <TravelCard v-for="(travel, index) in travels" :key="index" :id="travel.id" :price="travel.price"
        :arrival_date="new Date(travel.arrival_date)" :origin_city="travel.origin_city" :destination_city="travel.destination_city"
        :departure_date="new Date(travel.departure_date)" />
    </div>
    <div class="no-content" v-else>
      <h1>No travels</h1>
    </div>
  </div>
</template>
<style>

.w-full {
  width: 95%;
}
.no-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.no-content>h1 {
  margin-top: 5rem;
  font-size: 32px;
  font-family: "Heebo", Avenir, Helvetica, Arial, sans-serif;
  color: white;
}

.form-wrapper {
  margin-top: 30px;
  padding: 20px;
  max-width: 600px;
  border-radius: 25px;
  background-color: white;
  opacity: 0.9;
}

.form-wrapper b-dark {
  border-color: black;
}

.container {
  margin-top: 160px;
  padding: 130px;
}

.text-slider {
  font-size: 32px;
  font-family: "Heebo", Avenir, Helvetica, Arial, sans-serif;
  color: white;
}

.cards-wrapper {
  display: flex;
  column-gap: 80px;
  row-gap: 20px;
  flex-wrap: wrap;
}
</style>
