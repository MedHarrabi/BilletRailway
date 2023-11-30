/**
 * This module that contains helper functions for handling internationalization.
 * It provides methods for loading locale-specific messages, switching between locales, and checking if a given locale is supported.
 * Additionally, it includes a middleware function for routing that redirects to a default locale if the requested locale is not supported.
 */
import i18n from "@/i18n"
import { nextTick } from "vue"
 /**
 * TODO: This message is temporary and will be updated once the .env file is incorporated.
 */
const supportedLocales= 'en,de,fr'
const Trans = {

    /**
     * Gets the default locale.
     */
    get defaultLocale()
    {
        /**
         * TODO: This message is temporary and will be updated once the .env file is incorporated.
         */
        return 'en'
    },

    /**
     * Gets the supported locales.
     */
    get supportedLocales()
    {
        return supportedLocales.split(",")
    },

    /**
     * Gets the current locale.
     */
    get currentLocale()
    {
        return i18n.global.locale.value
    },

    /**
     * Sets the current locale.
     */
    set currentLocale(newLocale)
    {
        i18n.global.locale.value = newLocale
    },

    /**
     * Helper function for changing the language of an application, updates the HTML lang attribute,
     * and saves the new locale to localStorage.
     */
    async switchLanguage(newLocale)
    {
        console.log("HEY: new",newLocale);

        await Trans.loadLocaleMessages(newLocale);
        Trans.currentLocale = newLocale;
        document.querySelector("html").setAttribute("lang", newLocale);
        localStorage.setItem("user-locale", newLocale);
    },

    /**
     * Helper function that loads locale-specific messages for an application and sets them using the global i18n object.
     */
    async loadLocaleMessages(locale)
    {
        console.log("HEY: load",locale);
       // console.log("HEY: load",!i18n.global.availableLocales.includes(locale));

        if (!i18n.global.availableLocales.includes(locale) && locale)
        {
            console.log("HEY: message",`@/i18n/locales/${locale}.json`);

            try {
                const messages = await import(`../i18n/locales/${locale}.json`);
                // Rest of your code
            } catch (error) {
                console.error('Error loading language file:', error);
            }
            //i18n.global.setLocaleMessage(locale, messages.default);
        }
        return nextTick();
    },

    /**
     * Helper function that checks if a given locale is supported by this translation.
     */
    isLocaleSupported(locale)
    {
        return Trans.supportedLocales.includes(locale);
    },

    /**
     * Gets the user locale.
     */
    getUserLocale()
    {
        const locale = window.navigator.language || window.navigator.userLanguage || Trans.defaultLocale;
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    /**
     * Gets the persisted locale.
     */
    getPersistedLocale()
    {
        const persistedLocale = localStorage.getItem("user-locale");
        if (Trans.isLocaleSupported(persistedLocale))
        {
            return persistedLocale;
        }
        else return null;
    },

    /**
     * Helper function that guesses the user's preferred locale by checking their persisted and browser settings
     * or returns the default locale.
     */
    guessDefaultLocale()
    {
        const userPersistedLocale = Trans.getPersistedLocale();
        if (userPersistedLocale)
        {
            return userPersistedLocale;
        }
        const userPreferredLocale = Trans.getUserLocale();
        if (Trans.isLocaleSupported(userPreferredLocale.locale))
        {
            return userPreferredLocale.locale;
        }
        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion))
        {
            return userPreferredLocale.localeNoRegion;
        }
        return Trans.defaultLocale;
    },

    /**
     * Helper function that serves as middleware for client-side routing and checks if the requested locale is supported,
     * switching to it if so, and redirecting to a default locale otherwise.
     */
    async routeMiddleware(to, _from, next)
    {
        const paramLocale = to.params.locale;
        if (!Trans.isLocaleSupported(paramLocale))
        {
            return next(Trans.guessDefaultLocale() + "/");
        }
        await Trans.switchLanguage(paramLocale);
        return next();
    }
}

export default Trans;
