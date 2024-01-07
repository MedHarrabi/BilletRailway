<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <div class="container">
    <h1 class="text-slider">Book Fast</h1>
    <div class="form-wrapper">
      <VaForm ref="myForm" stateful class="mb-2 flex flex-col gap-2">
        <VaInput class="mr-5 b-dark" name="firstName" label="First Name" />
        <VaInput class="b-dark" name="lastName" label="Last Name" />
        <VaDateInput class="mr-5 b-dark" name="birthDay" label="Birth day" />
        <VaButton
            type="submit"
            class="mt-4 ml-5"
        >
          Search
        </VaButton>
      </VaForm>
    </div>
    <div class="cards-wrapper">
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
      <VaCard class="travel-card">
        <VaCardTitle>Travel card</VaCardTitle>
        <div class="info-wrapper my-3">
          <h2>Origin</h2>
          <h3>Destination</h3>
        </div>
        <div class="info-wrapper my-3">
          <h2>Arrival date</h2>
          <h3>Deaparture date</h3>
        </div>
        <VaCardActions align="between">
          <VaButton>book</VaButton>
        </VaCardActions>
      </VaCard>
    </div>
  </div>
</template>
<style>
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

.info-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.travel-card {
  padding: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  max-width: 250px;
  opacity: 0.9;
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
