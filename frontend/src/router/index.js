import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import OTPPage from '../pages/OTPPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },

  {
    path: '/register',
    component: RegisterPage,
  },

  {
    path: '/otp',
    component: OTPPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
