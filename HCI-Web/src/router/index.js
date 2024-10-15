import { createRouter, createWebHistory } from 'vue-router';
import PantallaInicio from '@/Pantallas/PantallaInicio.vue';
import PantallaMas from '@/Pantallas/PantallaMas.vue';
import PantallaIngresar from '@/Pantallas/PantallaIngresar.vue';
import PantallaMovimientos from '@/Pantallas/PantallaMovimientos.vue';
import PantallaMedios from '@/Pantallas/PaymentMethodsPage.vue';
import NotFoundPage from '@/Pantallas/NotFoundPage.vue';
import SignInPage from '@/Pantallas/SignInPage.vue';
import SignUpPage from '@/Pantallas/SignUpPage.vue';
import AddPaymentMethodPage from '@/Pantallas/AddPaymentMethodPage.vue';
import RecoverPasswordPage from '@/Pantallas/RecoverPasswordPage.vue';
import InvestPage from '@/Pantallas/InvestPage.vue';
import PaymentMethodsPage from '@/Pantallas/PaymentMethodsPage.vue';
import MyData from '@/Pantallas/MyData.vue';


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
  history: createWebHistory(),
  routes
});

export default router;
