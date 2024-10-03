/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import VChart from 'vue-echarts'
import 'echarts'

const app = createApp(App)

registerPlugins(app)
app.component('v-chart', VChart)

app.mount('#app')

//comentario para hacer commit