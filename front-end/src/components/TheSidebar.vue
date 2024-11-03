<template>
  <div :class="[
    'bg-gray-700 h-full transition-all duration-300 flex flex-col items-center',
    isSidebarVisible ? 'w-[300px]' : 'w-[70px]'
  ]">
    <div class="h-[85px] bg-gray-300 flex items-center justify-center w-full gap-4 py-4">
      <router-link to="home">
        <img src="../assets/logo.png" :class="isSidebarVisible ? 'h-16' : 'h-10'" alt="Logo" />
      </router-link>
      <span v-if="isSidebarVisible" class="text-lg font-semibold text-gray-800">AGROTECH</span>
    </div>

    <div class="flex-1 flex flex-col justify-start w-full mt-4">
      <RouterLink to="/home" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-home fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Home</span>
      </RouterLink>
      <RouterLink to="/animais" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-wheelchair fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Animais</span>
      </RouterLink>
      <RouterLink to="/animais-card" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-window-restore"></i>
        <span v-if="isSidebarVisible" class="ml-2">Animais Card</span>
      </RouterLink>
      <RouterLink to="/fazenda" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-map"></i>
        <span v-if="isSidebarVisible" class="ml-2">Fazenda</span>
      </RouterLink>
      <RouterLink to="/informacoes" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-info-circle fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Informações</span>
      </RouterLink>
      <RouterLink to="/usuarios" class="flex items-center text-white w-full" :class="{
        'justify-center px-2 py-2': !isSidebarVisible,
        'justify-start px-2 py-2': isSidebarVisible
      }">
        <i class="fa fa-user fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Usuários</span>
      </RouterLink>
    </div>

    <div class="flex mb-16 items-center w-full ml-4 gap-4">
      <img class="rounded-full h-12 w-12 border-2 border-gray-300" src="../assets/imgs/login.jpg" alt="User avatar" />
      <div class="flex flex-col items-start">
        <span v-if="isSidebarVisible" class="text-white text-sm">Habbiner Soares de Andrade</span>
        <span v-if="isSidebarVisible" class="text-gray-300 text-xs">habbiner.andrade@gmail.com</span>
        <RouterLink to="/">
          <span v-if="isSidebarVisible" class="text-white cursor-pointer flex items-center gap-1 text-sm">
            <i class="fa fa-sign-out fa-lg"></i>
            Logout
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',
  props: {
    isSidebarVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.w-full {
  display: flex;
}
</style>
