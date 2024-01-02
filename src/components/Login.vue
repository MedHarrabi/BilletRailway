<script setup>
import {reactive} from "vue";
import {useUsersStore} from "@/stores/counter";

const form = reactive({
  username: '',
  password: '',
})
const handleSubmit = ()=>{
  console.log("CHECK0", form)
  const store = useUsersStore();
  store.login(form);
};

</script>

<template>
  <VaForm
      class="w-[300px]"
      style="display: table-caption;"
      tag="form"
      @submit.prevent="handleSubmit"
  >
    <VaInput
        v-model="form.username"
        :label="$t('login.username')"
    />

    <VaInput
        v-model="form.password"
        style="text-transform: none;"
        class="mt-3"
        type="password"
        :label="$t('login.password')"
    />
    <VaButton
        type="submit"
        color="#06BBCC"
        class="mt-3"
        text-color="#fff"
    >
      Login
    </VaButton>
  </VaForm>
</template>

<style scoped>
VaInput label{
  color: #06BBCC !important;
}
</style>