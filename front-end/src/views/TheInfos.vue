<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-400">
            <div class="flex items-center h-[85px] bg-red-50 relative">
                <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
                <span class="mt-[25px] mb-[35px] text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Bem-vindo à Tela de Informações!
                </span>
            </div>
            <div class="p-4">
                <p>Esta é a página de informações detalhadas.</p>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'TheInfos',
    components: {
        TheSidebar,
    },
    data() {
        return {
            isSidebarVisible: false,
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
