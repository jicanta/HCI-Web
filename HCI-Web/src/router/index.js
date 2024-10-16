import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/pages/PantallaInicio.vue';
import PantallaMas from '@/pages/PantallaMas.vue';
import PantallaIngresar from '@/pages/PantallaIngresar.vue';
import PantallaMovimientos from '@/pages/PantallaMovimientos.vue';
import PantallaMedios from '@/pages/PaymentMethodsPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import SignInPage from '@/pages/SignInPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import AddPaymentMethodPage from '@/pages/AddPaymentMethodPage.vue';
import RecoverPasswordPage from '@/pages/RecoverPasswordPage.vue';
import InvestPage from '@/pages/InvestPage.vue';
import PaymentMethodsPage from '@/pages/PaymentMethodsPage.vue';
import MyData from '@/pages/MyData.vue';


const routes = [
  { path: '/', name: 'Inicio', component: PantallaInicio },
  { path: '/more', name: 'Mas', component: PantallaMas },
  { path: '/deposit', name: 'Ingresar', component: PantallaIngresar },
  { path: '/movements', name: 'Movimientos', component: PantallaMovimientos },
  { path: '/payment-methods', name: 'Medios de pago', component: PaymentMethodsPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
  { path: '/sign-in', name: 'SignIn', component: SignInPage },
  { path: '/sign-up', name: 'SignUp', component: SignUpPage },
  { path: '/add-payment-method', name: 'AddPaymentMethod', component: AddPaymentMethodPage},
  { path: '/recover-password', name: 'RecoverPassword', component: RecoverPasswordPage},
  { path: '/invest', name: 'Invest', component: InvestPage},
  { path: '/mydata', name: 'My Data', component: MyData}
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
