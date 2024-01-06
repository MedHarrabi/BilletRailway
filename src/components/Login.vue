<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUsersStore } from "../stores/auth.store";
import { useI18n } from 'vue-i18n';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();
const { t, locale } = useI18n();
const router = useRouter()

const user_store = useUsersStore();
const form = reactive({
  username: '',
  password: '',
})
///const isBtnDisabled = ref(false)
const handleSubmit = async () => {
  try {
    await user_store.login(form);
    router.push(`/${locale}/admin`)
    toaster.show("Logged In Successfully", {
      type: "success",
      position: "bottom",
    });
    setTimeout(() => {
      location.reload()
    }, 1000);
    // how to refresh my web page ?
  } catch (error) {
    toaster.show(`${error.response.data.error}`, {
      type: "error",
      position: "bottom",
    });
  }

};

</script>

<template>
  <VaForm class="w-[300px]" style="display: table-caption;" tag="form" @submit.prevent="handleSubmit">
    <VaInput v-model="form.username" :label="$t('login.username')" />

    <VaInput v-model="form.password" style="text-transform: none;" class="mt-3" type="password"
      :label="$t('login.password')" />
    <VaButton type="submit" color="#06BBCC" class="mt-3" text-color="#fff" >
      Login
    </VaButton>
  </VaForm>
</template>

<style scoped>
VaInput label {
  color: #06BBCC !important;
}
</style>