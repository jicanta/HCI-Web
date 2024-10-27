// Add these imports at the top
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

// Router
import router from './router';

// Pinia
import { createPinia } from 'pinia';

// Importa useAppStore
import { useAppStore } from './stores/store';

const app = createApp(App);
const pinia = createPinia();

// Registra plugins (Vuetify, etc.)
registerPlugins(app);

app.use(router);
app.use(pinia);

// Asegúrate de que esto se ejecute después de app.use(pinia)
const appStore = useAppStore();
appStore.initializeApp();

app.mount('#app');
