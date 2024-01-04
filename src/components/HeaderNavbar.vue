<template>
  <VaNavbar>
    <template #left>
      <VaNavbarItem class="logo">
        <img src="@/assets/logo.png" style="height: 48px; width: 220px; margin-left: 30px;">
      </VaNavbarItem>
    </template>
    <template #center>
      <VaNavbarItem class="hidden sm:block mr-5">
        <a href="/" class="navbar-item-link">
          {{ $t("headerNavBar.home") }}
        </a>
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block">
        <a href="/about" class="navbar-item-link">
          {{ $t("headerNavBar.aboutUs") }}
        </a>
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block ml-5">
        <a href="/contact" class="navbar-item-link">
          {{ $t("headerNavBar.contactUs") }}
        </a>
      </VaNavbarItem>
      <VaNavbarItem class="hidden sm:block ml-5" v-if="user_store.isLoggedIn && tokenService.getRole() === 'ADMIN'">
        <a href="/admin" class="navbar-item-link">
          {{ $t("headerNavBar.admin") }}
        </a>
      </VaNavbarItem>
    </template>
    <template #right>
      <VaNavbarItem class="hidden sm:block" v-if="!user_store.isLoggedIn">
        <VaButtonDropdown icon="person" opened-icon="person" :close-on-content-click="false" color="#06BBCC"
          text-color="#fff" left-icon :label="$t('headerNavBar.login') + ' / ' + $t('headerNavBar.register')">
          <VaTabs v-model="value2" stateful grow style="width: 300px; height: auto" color="#06BBCC">
            <template #tabs>
              <VaTab key="login" name="login">
                <VaIcon name="person" size="large" class="mr-2" />
                {{ $t('headerNavBar.login') }}
              </VaTab>
              <VaTab key="register" name="register">
                <VaIcon name="feed" size="big" class="mr-2" />
                {{ $t('headerNavBar.register') }}
              </VaTab>
            </template>
          </VaTabs>
          <VaCard square outlined class="mt-3">
            <VaCardTitle>
              <VaIcon :name="currentTab1.icon" size="big" class="mr-2" color="background-element" />
              {{ currentTab1.name }}
            </VaCardTitle>
            <VaCardContent>
              <component :is="currentTab1.component" />
            </VaCardContent>
          </VaCard>
        </VaButtonDropdown>
      </VaNavbarItem>
      <VaNavbarItem v-else>
        <h3 class="nav-username">
          {{ user_store.getUser?.username || user_store.getUser?.email || 'User' }}
        </h3>
      </VaNavbarItem>
      <VaNavbarItem>
        <LanguageSwitcher></LanguageSwitcher>
      </VaNavbarItem>
      <VaNavbarItem v-if="user_store.isLoggedIn">
        <VaButton color="#06BBCC" class="mt-3" text-color="#fff" @click="user_store.logout()">Logout</VaButton>
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<style scoped></style>


<script setup>
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, computed } from 'vue';
import { useUsersStore } from '../stores/auth.store';
import tokenService from "../services/token.service";
//console.log(" t('headerNavBar.login')", t('headerNavBar.register'))
const TABS2 = [
  { icon: "person", title: "login", name: t('headerNavBar.register'), content: "Feed content", component: Login },
  { icon: "feed", title: "register", name: t('headerNavBar.register'), content: "Profile content", component: Register },
];

const tabs2 = TABS2;
const value2 = ref(TABS2[0].title);

const currentTab1 = computed(() => {
  const selectedTab = tabs2.find(({ title }) => title === value2.value);

  // Adding the translated name property directly within the computed property
  if (selectedTab) {
    selectedTab.name = t(`headerNavBar.${selectedTab.title}`);
  }

  return selectedTab;
});

const user_store = useUsersStore()

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