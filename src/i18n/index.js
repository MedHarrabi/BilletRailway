/**
 * This exports an instance of the Vue.js plugin 'vue-i18n'. It creates a i18n object with messages for English, German, and French languages.
 * It also sets the default and fallback locales, and enables global injection.
 */
import {createI18n} from "vue-i18n";
import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';

export default createI18n({
    /**
     * TODO: This message is temporary and will be updated once the .env file is incorporated for (locale, fallbackLocale).
     */
    locale: 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    legacy: false,
    messages: {en, de, fr}
})