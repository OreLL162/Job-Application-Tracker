import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import OTPPage from '../pages/OTPPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import JobModal from '../components/JobModal.vue';

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
  },

  {
    path: '/:userId/dashboard',
    component: DashboardPage,
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
