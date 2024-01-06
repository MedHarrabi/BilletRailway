<template>
  <VaNavbar>
    <template #left>
      <VaNavbarItem class="logo">
        <img src="@/assets/logo.png" style="height: 48px; width: 220px; margin-left: 30px;">
      </VaNavbarItem>
    </template>
    <template #center>
      <div class="admin-navbar-items" v-if="user_store.isLoggedIn && tokenService.getRole() === 'ADMIN'">
        <VaNavbarItem class="hidden sm:block ml-5">
          <a :href="`/${locale}/admin`" class="navbar-item-link">
            {{ $t("headerNavBar.home") }}
          </a>
        </VaNavbarItem>
        <VaNavbarItem class="hidden sm:block ml-5">
          <a :href="`/${locale}/admin/travels`" class="navbar-item-link">
            {{ $t("headerNavBar.travels") }}
          </a>
        </VaNavbarItem>
        <VaNavbarItem class="hidden sm:block ml-5">
          <a :href="`/${locale}/admin/reservations`" class="navbar-item-link">
            {{ $t("headerNavBar.reservations") }}
          </a>
        </VaNavbarItem>
      </div>
      <!-- <div class="user-navbar-items" v-else-if="user_store.isLoggedIn && tokenService.getRole() === 'USER'"> -->
      <div class="user-navbar-items" v-else>
        <VaNavbarItem class="hidden sm:block mr-5">
          <a :href="`/${locale}/`" class="navbar-item-link">
            {{ $t("headerNavBar.home") }}
          </a>
        </VaNavbarItem>
        <VaNavbarItem class="hidden sm:block">
          <a :href="`/${locale}/about`" class="navbar-item-link">
            {{ $t("headerNavBar.aboutUs") }}
          </a>
        </VaNavbarItem>
        <VaNavbarItem class="hidden sm:block ml-5">
          <a :href="`/${locale}/contact`" class="navbar-item-link">
            {{ $t("headerNavBar.contactUs") }}
          </a>
        </VaNavbarItem>
      </div>
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
        <div class="username-role">
          <h3 class="nav-username">
            {{ user.username || user.email }}
          </h3>
          <h6 class="role">
            {{ user.role }}
          </h6>
        </div>
      </VaNavbarItem>
      <VaNavbarItem>
        <LanguageSwitcher></LanguageSwitcher>
      </VaNavbarItem>
      <VaNavbarItem v-if="user_store.isLoggedIn">
        <VaButton color="#06BBCC" class="" text-color="#fff" @click="logout">Logout</VaButton>
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
const { t, locale } = useI18n();
import { ref, computed } from 'vue';
import { useUsersStore } from '../stores/auth.store';
import { storeToRefs } from 'pinia'
import tokenService from "../services/token.service";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();
const router = useRouter()

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
const { user } = storeToRefs(user_store)

const logout = () => {
  user_store.logout();
  router.push(`/${locale.value}/`)
  toaster.show("Logged Out", {
      type: "success",
      position: "bottom",
    });
  
}

</script>

<style scoped>
.admin-navbar-items {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.user-navbar-items {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

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

.username-role {
  display: flex;
  flex-direction: column;
}
.role {
  
  color:gray;
  font-size: 12px;
  align-self: center;
}
</style>