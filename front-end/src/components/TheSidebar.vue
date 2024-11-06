<template>
  <!-- Sidebar -->
  <div :class="[
    'bg-gray-700 h-full transition-all duration-300 flex flex-col items-center',
    isSidebarVisible ? 'w-[350px]' : 'w-[70px]'
  ]">
    <div class="h-[85px] bg-gray-300 flex items-center justify-center w-full">
      <span v-if="isSidebarVisible">Menu AgroTech</span>
    </div>
    <div class="flex-1 flex-col items-center mt-4 w-full">
      <RouterLink to="/home" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-home fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Home</span>
      </RouterLink>
      <RouterLink to="/animais" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-wheelchair fa-lg" aria-hidden="true"></i>
        <span v-if="isSidebarVisible" class="ml-2">Animais</span>
      </RouterLink>
      <RouterLink to="/fazenda" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-map" aria-hidden="true"></i>
        <span v-if="isSidebarVisible" class="ml-2">Fazenda</span>
      </RouterLink>
      <RouterLink to="/informacoes" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-info-circle fa-lg" aria-hidden="true"></i>
        <span v-if="isSidebarVisible" class="ml-2">informações</span>
      </RouterLink>
      <RouterLink to="/usuarios" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-user fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Usuários</span>
      </RouterLink>
    </div>
    <div class="flex justify-center items-center mb-16">
      <img class="rounded-full h-10 mr-3" src="../assets/imgs/login.jpg" alt="" srcset="">
      <div class="flex flex-col gap-1">
        <span v-if="isSidebarVisible" class="ml-2 text-white">Olá, Habbiner</span>
        <RouterLink to="/">
          <span v-if="isSidebarVisible" class="ml-2 text-white cursor-pointer">
            <i class="fa fa-sign-out fa-lg" aria-hidden="true"></i>
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
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
};
</script>

<style scoped></style>
