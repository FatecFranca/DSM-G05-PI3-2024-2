import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from '@/views/TheLogin.vue';
import TheHome from '@/views/TheHome.vue';
import TheAnimal from '@/views/TheAnimal.vue';
import TheAnimals from '@/views/TheAnimals.vue';
import TheFarm from '@/views/TheFarm.vue';
import TheInfos from '@/views/TheInfos.vue';
import TheUsers from '@/views/TheUsers.vue';

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
  },
  {
    path: '/animal',
    name: 'Animal',
    component: TheAnimal,
  },
  {
    path: '/animais',
    name: 'Animals',
    component: TheAnimals,
  },
  {
    path: '/fazenda',
    name: 'Farm',
    component: TheFarm,
  },
  {
    path: '/informacoes',
    name: 'Infos',
    component: TheInfos,
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: TheUsers,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
