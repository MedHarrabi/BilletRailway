import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { createVuestic, createIconsConfig } from "vuestic-ui";
import "vuestic-ui/css";
import i18n from "./i18n";


const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(createVuestic({
    config: {
        icons: createIconsConfig({
            aliases: [
                {
                    name: "bell",
                    color: "#FFD43A",
                    to: "fa4-bell",
                },
                {
                    name: "ru",
                    to: "flag-icon-ru small",
                },
            ],
            fonts: [
                {
                    name: "fa4-{iconName}",
                    resolve: ({ iconName }) => ({ class: `fa fa-${iconName}` }),
                },
                {
                    name: "flag-icon-{countryCode} {flagSize}",
                    resolve: ({ countryCode, flagSize }) => ({
                        class: `flag-icon flag-icon-${countryCode} flag-icon-${flagSize}`,
                    }),
                },
            ]
        })
    }
}))

app.mount('#app');
