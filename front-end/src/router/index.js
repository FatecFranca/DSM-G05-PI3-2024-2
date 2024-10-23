import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from '../views/TheLogin.vue';
import TheHome from '../views/TheHome.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: TheLogin,
  },
  {
    path: '/home',
    name: 'Home',
    component: TheHome,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
