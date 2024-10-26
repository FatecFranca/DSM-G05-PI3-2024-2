<template>
  <div class="w-screen h-screen flex">
    <TheNavbar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

    <!-- Main -->
    <div class="flex-1 h-full bg-gray-400">
      <div class="flex items-center h-[50px] bg-red-50">
        <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
      </div>

      <!-- Main Content Area -->
      <div class="p-4">
        Main
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
  name: 'TheHome',
  components: {
    TheSidebar,
  },
  data() {
    return {
      isSidebarVisible: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
  },
};
</script>

<style scoped></style>
