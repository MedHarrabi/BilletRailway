<template>
  <va-dropdown class="flag-dropdown">
    <template #anchor>
      <va-button preset="primary" class="dropdown-button">
        <span class="flag-icon">
          <img :src="`/src/assets/flags/${locale}.png`" :alt="`Flag Icon - ${locale}`" class="flag-icon"/>
        </span>
        <span class="language-text" style="margin-bottom: 5px;">
          {{ t(`languageSupported.${locale.toLowerCase()}`) }}
        </span>
      </va-button>
    </template>
    <div class="flag-dropdown-content">
      <div
          v-for="sLocale in supportedLocales"
          :key="`locale-${sLocale}`"
          @click="switchLanguage(sLocale)"
          class="flag-dropdown-item"
          :style="{ display: locale === sLocale ? 'none' : 'block' }"
      >
        <div class="flag-icon-container">
          <img :src="`/src/assets/flags/${sLocale}.png`" alt="Flag Icon" class="flag-icon" />
          <span class="language-text-item">
            {{ t(`languageSupported.${sLocale}`) }}
          </span>
        </div>
      </div>
    </div>
  </va-dropdown>
</template>

<script>
import {useI18n} from 'vue-i18n';
import translation from "@/i18n/translation";
import {useRouter} from "vue-router";

export default {
  name: "LanguageSwitcher",
  setup()
  {
    const {t, locale} = useI18n();
    const supportedLocales = translation.supportedLocales
    const router = useRouter();

    /**
     * Helper function switches the language and updates the URL with the new locale
     * parameter using a client-side router.
     */
    const switchLanguage = async (_newLocale) =>
    {
      await translation.switchLanguage(_newLocale);
      try
      {
        await router.replace({params: {locale: _newLocale}})
      }
      catch (e)
      {
        console.log(e)
        router.push("/")
      }
    }

    return {t, locale, supportedLocales, switchLanguage}
  }
}
</script>

<style scoped>
.flag-dropdown-content {
  width: 140px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-top: none;
}

.flag-dropdown-item {
  padding: 8px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
}

.flag-dropdown-item:last-child {
  border-bottom: none;
}

.flag-dropdown-item:hover {
  background-color: #f0f0f0;
}

.flag-icon-container {
  display: flex;
  align-items: center;
}

.flag-icon {
  width: 25px;
  margin-right: 8px;
}

.language-text {
  margin-bottom: 5px;
}

.dropdown-button {
  width: 140px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>