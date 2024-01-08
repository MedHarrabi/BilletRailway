<template>
        <h1 class="title">Create Travel</h1>
        <div class="form-wrapper">
                <VaForm ref="myForm" stateful class="mb-2 flex flex-col gap-2">
                        <VaInput class="mr-5 b-dark" name="Origin City" label="Origin City" v-model="searchForm.origin_city" />
                        <VaInput class="b-dark" name="Destination City" label="Destination City"
                                v-model="searchForm.destination_city" />
                        <VaDateInput class="mr-5 b-dark" name="Departure Date" label="Departure Date"
                                v-model="searchForm.departure_date" />
                        <VaDateInput class="b-dark" name="Arrival Date" label="Arrival Date"
                                v-model="searchForm.arrival_date" />
                        <VaInput v-model="searchForm.price" class="mb-6" mask="numeral" name="Price" label="Price" />
                        <VaButton type="submit" @click="submit()" class="mt-4 w-full">
                                Create
                                <CaTrainSpeed class="ml-5" />
                        </VaButton>
                </VaForm>
        </div>
</template>
    
<script setup lang='ts'>
import { CaTrainSpeed } from '@kalimahapps/vue-icons'
import axios from '../../../services/api';
import { ref } from 'vue';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const searchForm = ref({
        origin_city: '',
        destination_city: '',
        departure_date: null as any,
        arrival_date: null as any,
        price: NaN
})

const submit = async () => {
        try {
                const formData = searchForm.value;
                const response = await axios.post('/travel/create', formData);
                if (response.status === 201) {
                        toaster.show(`${response.data.message}`, {
                                type: "success",
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
h1.title {
        margin-inline: auto;
        width: fit-content;
        margin-top: 5rem;
}

.form-wrapper {
        margin-inline: auto;
        margin-top: 30px;
        padding: 20px;
        max-width: 600px;
        border-radius: 25px;
        background-color: white;
        opacity: 0.9;
}
</style>