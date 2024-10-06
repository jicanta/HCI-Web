import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/Pantallas/PantallaInicio.vue';
import PantallaMas from '@/Pantallas/PantallaMas.vue';
import PantallaIngresar from '@/Pantallas/PantallaIngresar.vue';
import PantallaMovimientos from '@/Pantallas/PantallaMovimientos.vue';
import PantallaMedios from '@/Pantallas/PantallaMedios.vue';
import NotFoundPage from '@/Pantallas/NotFoundPage.vue';
import SignInPage from '@/Pantallas/SignInPage.vue';
import SignUpPage from '@/Pantallas/SignUpPage.vue';


const routes = [
  { path: '/', name: 'Inicio', component: PantallaInicio },
  { path: '/more', name: 'Mas', component: PantallaMas },
  { path: '/deposit', name: 'Ingresar', component: PantallaIngresar },
  { path: '/movements', name: 'Movimientos', component: PantallaMovimientos },
  { path: '/payment-methods', name: 'Medios de pago', component: PantallaMedios },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
  { path: '/sign-in', name: 'SignIn', component: SignInPage },
  { path: '/sign-up', name: 'SignUp', component: SignUpPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
