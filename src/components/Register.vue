<script setup>
import { useForm } from 'vuestic-ui'
import {reactive} from "vue";
import {useUsersStore} from "@/stores/counter";

const { isValid, validate, reset, resetValidation } = useForm('formRef')

const form = reactive({
  username: '',
  password: '',
  email: ''
})

const submit = () => {
  console.log("CHECK===", form);
  const store = useUsersStore();
  store.register(form);
}
</script>

<template>
  <VaForm style="display: table-caption;" ref="formRef" class="flex flex-col items-baseline gap-6">
    <VaInput
        v-model="form.username"
        :rules="[(value) => (value && value.length > 0) || 'First name is required']"
        label="firstName"
    />
    <VaInput
        v-model="form.email"
        type="email"
        label="Email"
    />
    <VaInput
        v-model="form.password"
        style="text-transform: none;"
        class="mt-3"
        type="password"
        :label="$t('login.password')"
    />

    <VaButton  class="mt-3" :disabled="!isValid" @click="validate() && submit()">
      Submit
    </VaButton>
  </VaForm>
</template>

<style scoped>

</style>