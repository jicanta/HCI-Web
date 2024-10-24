import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import MorePage from '@/pages/MorePage.vue';
import DepositPage from '@/pages/PaymentLinkPage.vue';
import ActivityPage from '@/pages/ActivityPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import SignInPage from '@/pages/SignInPage.vue';
import SignUpPage from '@/pages/SignUpPage.vue';
import AddPaymentMethodPage from '@/pages/AddPaymentMethodPage.vue';
import RecoverPasswordPage from '@/pages/RecoverPasswordPage.vue';
import InvestPage from '@/pages/InvestPage.vue';
import PaymentMethodsPage from '@/pages/PaymentMethodsPage.vue';
import MyData from '@/pages/MyData.vue';
import PaymentPage from '@/pages/PaymentPage.vue';


const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/more', name: 'more', component: () => import('../pages/MorePage.vue') },
  { path: '/payment-link', name: 'payment-link', component: () => import('../pages/PaymentLinkPage.vue') },
  { path: '/movements', name: 'movements', component: () => import('../pages/ActivityPage.vue') },
  { path: '/payment-methods', name: 'paymentMethods', component: () => import('../pages/PaymentMethodsPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('../pages/NotFoundPage.vue') },
  { path: '/sign-in', name: 'signIn', component: () => import('../pages/SignInPage.vue') },
  { path: '/sign-up', name: 'signUp', component: () => import('../pages/SignUpPage.vue') },
  { path: '/add-payment-method', name: 'addPaymentMethod', component: () => import('../pages/AddPaymentMethodPage.vue')},
  { path: '/recover-password', name: 'recoverPassword', component: () => import('../pages/RecoverPasswordPage.vue')},
  { path: '/invest', name: 'invest', component: () => import('../pages/InvestPage.vue') },
  { path: '/account', name: 'account', component: () => import('../pages/MyData.vue') },
  { path: '/pay', name: 'pay', component: () => import('../pages/PaymentPage.vue') }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
