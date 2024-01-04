<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUsersStore } from "../stores/auth.store";

const user_store = useUsersStore();
const form = reactive({
  username: '',
  password: '',
})
const isBtnDisabled = ref(false)
const handleSubmit = async () => {
  try {
    isBtnDisabled.value = true;
    await user_store.login(form);
    isBtnDisabled.value = false
  } catch (error) {
    console.log(`login error ::>> ${JSON.stringify(error)}`);
  }

};

</script>

<template>
  <VaForm class="w-[300px]" style="display: table-caption;" tag="form" @submit.prevent="handleSubmit">
    <VaInput v-model="form.username" :label="$t('login.username')" />

    <VaInput v-model="form.password" style="text-transform: none;" class="mt-3" type="password"
      :label="$t('login.password')" />
    <VaButton type="submit" color="#06BBCC" class="mt-3" text-color="#fff" :aria-disabled="isBtnDisabled">
      Login
    </VaButton>
  </VaForm>
</template>

<style scoped>
VaInput label {
  color: #06BBCC !important;
}
</style>