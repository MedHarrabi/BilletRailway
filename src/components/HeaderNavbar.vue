<template>
  <VaNavbar>
    <template #left>
      <VaNavbarItem class="logo">
        <img src="@/assets/logo.png" style="height: 48px; width: 220px; margin-left: 30px;">
      </VaNavbarItem>
    </template>
    <template #center>
      <VaNavbarItem class="hidden sm:block mr-5">
        <a href="#" class="navbar-item-link">
          {{ $t("headerNavBar.home") }}
        </a>
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        <a href="#" class="navbar-item-link">
          {{ $t("headerNavBar.aboutUs") }}
        </a>
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block ml-5">
        <a href="/contact" class="navbar-item-link">
          {{ $t("headerNavBar.contactUs") }}
        </a>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block">
        <VaButtonDropdown
          icon="person"
          opened-icon="person"
          :close-on-content-click="false"
          color="#06BBCC"
            text-color="#fff"
        >
          <VaTabs v-model="selectedTab" stateful grow style="width: 350px; height: auto" color="#06BBCC">
            <template #tabs>
              <VaTab :key="t('headerNavBar.login')" name="Login">
                <VaIcon name="person" size="small" class="mr-2" />
                {{ $t('headerNavBar.login') }}
              </VaTab>
              <VaTab :key="$t('headerNavBar.register')" :name="$t('headerNavBar.register')">
                <VaIcon name="feed" size="small" class="mr-2" />
                {{ $t('headerNavBar.register') }}
              </VaTab>
            </template>
          </VaTabs>
          <VaCard square outlined>
            <VaCardContent>
              aa
            </VaCardContent>
            </VaCard>
        </VaButtonDropdown>
      </VaNavbarItem>
      <VaNavbarItem>
        <LanguageSwitcher></LanguageSwitcher>
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<style scoped>

</style>


<script setup>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import {useI18n} from 'vue-i18n';
const {t} = useI18n();
</script>

<style scoped>
.va-navbar__item {
  font-weight: 500;
}
.navbar-item-link {
  color: #000;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-item-link:hover {
  color: #06BBCC;
}
</style>