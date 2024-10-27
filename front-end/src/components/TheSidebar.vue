<template>
  <!-- Sidebar -->
  <div :class="[
    'bg-gray-700 h-full transition-all duration-300 flex flex-col items-center',
    isSidebarVisible ? 'w-[350px]' : 'w-[70px]'
  ]">
    <div class="h-[85px] bg-gray-300 flex items-center justify-center w-full">
      <span v-if="isSidebarVisible">Menu</span>
    </div>
    <div class="flex flex-col items-center mt-4 w-full">
      <RouterLink to="/home" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-home fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Home</span>
      </RouterLink>
      <RouterLink to="/usuarios" class="flex items-center p-2 text-white w-full justify-center">
        <i class="fa fa-user fa-lg"></i>
        <span v-if="isSidebarVisible" class="ml-2">Usuários</span>
      </RouterLink>
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
