import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/Pantallas/PantallaInicio.vue';
import PantallaMas from '@/Pantallas/PantallaMas.vue';
import PantallaIngresar from '@/Pantallas/PantallaIngresar.vue';

const routes = [
  { path: '/', name: 'Inicio', component: PantallaInicio },
  { path: '/more', name: 'Mas', component: PantallaMas },
  { path: '/deposit', name: 'Ingresar', component: PantallaIngresar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
