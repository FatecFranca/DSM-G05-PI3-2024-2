<template>
    <div class="flex h-screen bg-[url('@/assets/imgs/BgColor.png')] bg-cover">

        <!-- Sidebar -->
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

        <!-- Conteúdo Principal -->
        <div class="flex-1 h-full">
            <div class="flex items-center h-[50px] bg-red-50">
                <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
            </div>

            <div class="h-56 flex-1"> <!--Div Superior-->
                <div class="justify-items-center">
                    <h class='text-4xl center'>Usuários</h>
                    <p class='mt-6'>Selecione o que você deseja cadastrar ou atualizar</p>
                </div>

                <div class="flex mt-20 ml-10 font-bold"> <!--Div engloba Barra filtros e botao cadastrar-->
                    <div class="flex items-center bg-neutral-200 bg-opacity-40"> <!--Div Barra filtros-->
                        <div class="border border-gray-400">
                            <img class="mx-7 my-3.5" src="../assets/imgs/filter.png" alt="logo">
                        </div>
                        <div class="border border-gray-400">
                            <p class="mx-7 my-4 text-sm">Filtro</p>
                        </div>
                        <div class="flex w-32 border border-gray-400">
                            <p class="mx-7 my-4 text-sm">Data</p>
                            <img class="mx-1 my-3" src="../assets/imgs/arrow.png" alt="logo">
                        </div>
                        <div class="flex w-44 border border-gray-400">
                            <p class="mx-7 my-4 text-sm">Ordenar Por</p>
                            <img class="-mx-1 my-3" src="../assets/imgs/arrow.png" alt="logo">
                        </div>
                        <div class="flex w-32 border border-gray-400">
                            <p class="mx-7 my-4 text-sm">Status</p>
                            <img class="-mx-1 my-3" src="../assets/imgs/arrow.png" alt="logo">
                        </div>
                        <div class="flex border border-gray-400">
                            <img class="h-4 w-4 ml-4 -mr-4 my-[1.0rem]" src="../assets/imgs/back.png" alt="logo">
                            <p class="mx-7 my-4 text-sm text-red-600">Limpar Filtro</p>
                        </div>
                    </div>

                    <button
                        class="bg-teal-600 bg-opacity-50 text-sm w-56 h-11 rounded-lg ml-[25rem] mt-[0.650rem] text-white">
                        + CADASTRAR USUÁRIO
                    </button>

                </div>
            </div>

            <div> <!--Div Inferior-->
                <div> <!--Div quadro-->
                    <div> <!--Div Lista Topicos-->
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'TheUsers',
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
