<script setup>
import { useForm } from 'vuestic-ui'
import { reactive } from "vue";
import { useUsersStore } from "@/stores/auth.store";

const { validate, reset, resetValidation } = useForm('formRef')

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const user_store = useUsersStore();

const form = reactive({
  username: '',
  password: '',
  email: ''
})

const submit = async () => {
  try {
    //  isBtnDisabled.value = true
    console.log("check")
    await user_store.register(form);
    toaster.show("Signed up and logged in successfully", {
      type: "success",
      position: "bottom",
    });
    setTimeout(() => {
      location.reload()
    }, 1000);
    //  isBtnDisabled.value = false
  } catch (error) {
    toaster.show(`${error.response.data.error}`, {
      type: "error",
      position: "bottom",
    });
  }

}
</script>

<template>
  <VaForm style="display: table-caption;" ref="formRef" class="flex flex-col items-baseline gap-6">
    <VaInput v-model="form.username" :rules="[(value) => (value && value.length > 0) || 'First name is required']"
      label="firstName" />
    <VaInput v-model="form.email" type="email" label="Email" />
    <VaInput v-model="form.password" style="text-transform: none;" class="mt-3" type="password"
      :label="$t('login.password')" />

    <VaButton class="mt-3" @click="validate() && submit()">
      Submit
    </VaButton>
  </VaForm>
</template>

<style scoped></style>