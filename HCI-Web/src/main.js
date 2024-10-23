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

const app = createApp(App);
const pinia = createPinia();
// Registra plugins (Vuetify, etc.)
registerPlugins(app);

app.use(router);
app.use(pinia);

app.mount('#app');
