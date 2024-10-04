import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/Pantallas/PantallaInicio.vue';
import PantallaMas from '@/Pantallas/PantallaMas.vue';
import PantallaIngresar from '@/Pantallas/PantallaIngresar.vue';
import PantallaMovimientos from '@/Pantallas/PantallaMovimientos.vue';
import PantallaMedios from '@/Pantallas/PantallaMedios.vue';

const routes = [
  { path: '/', name: 'Inicio', component: PantallaInicio },
  { path: '/more', name: 'Mas', component: PantallaMas },
  { path: '/deposit', name: 'Ingresar', component: PantallaIngresar },
  { path: '/movements', name: 'Movimientos', component: PantallaMovimientos },
  { path: '/payment-methods', name: 'Medios de pago', component: PantallaMedios }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
