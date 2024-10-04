import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/Pantallas/PantallaInicio.vue';
import PantallaMas from '@/Pantallas/PantallaMas.vue';

const routes = [
  { path: '/', name: 'Inicio', component: PantallaInicio },
  { path: '/more', name: 'Mas', component: PantallaMas }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
