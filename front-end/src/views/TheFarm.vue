<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-400">
            <div class="flex items-center h-[85px] bg-red-50 relative">
                <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
                <span class="mt-[25px] mb-[35px] text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Bem-vindo à Tela Fazenda!
                </span>
            </div>
            <div class="p-4">
                <button @click="cadastrarFazenda" class="bg-blue-500 text-white px-4 py-2 rounded">
                    {{ mostrar ? 'Ocultar Cadastro' : 'Mostrar Cadastro' }}
                </button>
                <TheFarmModal v-if="mostrar" @close="mostrar = false" />
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheFarmModal from '@/components/TheFarmModal.vue';

export default {
    name: 'TheFarm',
    components: {
        TheSidebar,
        TheFarmModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            mostrar: false,
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        cadastrarFazenda() {
            this.mostrar = !this.mostrar;
        },
    },
};
</script>

<style scoped>
.container_fazenda {
    background-color: rgba(0, 0, 255, 0.477);
    width: 100vw;
    height: 100vh;
}
</style>
