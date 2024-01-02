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
        colors: {
            presets: {
                light: {
                    primary: '#06BBCC', // Updated primary color
                    myCoolColor: '#6CCCE2', // Adjusted color based on the palette
                    onMyCoolColor: '#ffffff', // Adjusted text color based on the palette
                }
            }
        }
    }
}))

app.mount('#app');
