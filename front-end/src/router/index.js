import { createRouter, createWebHistory } from 'vue-router';
import TheLogin from '@/views/TheLogin.vue';
import TheHome from '@/views/TheHome.vue';
import TheAnimal from '@/views/TheAnimal.vue';
import TheAnimals from '@/views/TheAnimals.vue';
import TheFarm from '@/views/TheFarm.vue';
import TheInfos from '@/views/TheInfos.vue';
import TheUsers from '@/views/TheUsers.vue';
import TheAnimalsCard from '@/views/TheAnimalsCard.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: TheLogin,
    meta: {
      title: 'AgroTech | Login'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: TheHome,
    meta: {
      title: 'AgroTech | Home'
    }
  },
  {
    path: '/animal',
    name: 'Animal',
    component: TheAnimal,
    meta: {
      title: 'AgroTech | Animal'
    }
  },
  {
    path: '/animais',
    name: 'Animals',
    component: TheAnimals,
    meta: {
      title: 'AgroTech | Animais'
    }
  },
  {
    path: '/animais-card',
    name: 'AnimalsCard',
    component: TheAnimalsCard,
    meta: {
      title: 'AgroTech | Animais'
    }
  },
  {
    path: '/fazenda',
    name: 'Farm',
    component: TheFarm,
    meta: {
      title: 'AgroTech | Fazenda'
    }
  },
  {
    path: '/informacoes',
    name: 'Infos',
    component: TheInfos,
    meta: {
      title: 'AgroTech | Informações'
    }
  },
  {
    path: '/usuarios',
    name: 'Users',
    component: TheUsers,
    meta: {
      title: 'AgroTech | Usuários'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  console.log(`Navegando para: ${window.location.origin}${to.fullPath}`);
  document.title = to.meta.title || 'AgroTech';
});

export default router;
