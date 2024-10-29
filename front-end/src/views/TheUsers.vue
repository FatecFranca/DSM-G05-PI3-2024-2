<template>
    <div class="flex-grow-1 bg-[url('@/assets/imgs/BgColor.png')] flex h-screen bg-cover">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>

        <div class="flex-grow -ml-1">
        <div class='h-56'> <!-- Div Superior -->
            
    <div class="justify-items-center mt-4">
        <h class='text-[2.0rem] center noto-sans-400'>Usuários</h>
        <hr class='w-[14rem] mt-2 -mb-3 border-black border-1.5'>
        <p class='mt-6 noto-sans-300'>Selecione o que você deseja cadastrar ou atualizar</p>
    </div>

    <div class="flex mt-[4.17em] ml-[] font-bold items-center"> <!-- Div engloba Barra filtros e botao cadastrar -->
        
        <!-- Div Barra filtros -->
        <div class="flex items-center rounded-lg bg-neutral-100 bg-opacity-40"> 

            <!-- Icone Filtro -->
            <div class="border rounded-l-lg w-16 h-[3.80rem] border-gray-300 flex justify-center items-center">
                <img class="w-6 h-[1.57em]" src="../assets/imgs/filter.png" alt="logo">
            </div>

            <!-- Filtro -->
            <div class="border noto-sans-700 border-gray-300 w-28 h-[3.80rem] flex justify-center items-center">
                <p class="text-[0.87em]">Filtro</p>
            </div>

            <!-- Data -->
            <div class="border noto-sans-700 border-gray-300 w-32 h-[3.80rem] flex justify-center items-center">
                <p class="text-[0.87em]">Data</p>
                <img class="ml-8" src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Ordenar por -->
            <div class="border noto-sans-700 border-gray-300 w-40 h-[3.80rem] flex justify-center items-center">
                <p class="text-[0.87em]">Ordenar Por</p>
                <img class="ml-8" src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Status -->
            <div class="border noto-sans-700 border-gray-300 w-44 h-[3.80rem] flex justify-center items-center">
                <p class="text-[0.87em] ">Status</p>
                <img class='ml-16' src="../assets/imgs/arrow.png" alt="logo">
            </div>

            <!-- Limpar Filtro -->
            <div class="rounded-r-lg noto-sans-700 border border-gray-300 w-40 h-[3.80rem] flex justify-center items-center">
                <img class="h-4 w-4 mr-2" src="../assets/imgs/back.png" alt="logo">
                <p class="text-[0.87em] text-red-600">Limpar Filtro</p>
            </div>
        </div>

        <!-- Botão -->
        <button @click="cadastrarFazenda" class="noto-san-700 bg-teal-600 bg-opacity-50 text-sm w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85em]">
            + CADASTRAR USUÁRIO
        </button>

    </div>
    </div>
    
    <div> <!--Div Inferior-->
        <div> <!--Div quadro-->
            
            <div class="p-4">
    <div class="flex justify-end"></div>
    <TheFarmModal v-if="mostrar" :fazenda="fazendaSelecionada" @close="fecharModal" />
    <div class="mt-6 -ml-[1em]">
        <table class="min-w-[98%] bg-white shadow-md rounded-lg overflow-hidden">
            <thead class=" border bg-neutral-200 bg-opacity-40">
                <tr class="rounded-t-lg">
                    <th class="py-2 px-4 text-left text-gray-700">ID</th>
                    <th class="py-2 px-4 text-left text-gray-700">USUÁRIO</th>
                    <th class="py-2 px-4 text-left text-gray-700">CARGO</th>
                    <th class="py-2 px-4 text-left text-gray-700">DATA CADASTRO</th>
                    <th class="py-2 px-4 text-left text-gray-700">ADMIN</th>
                    <th class="py-2 px-4 text-left text-gray-700">STATUS</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
                <tr v-for="fazenda in fazendas" :key="fazenda.id" class="hover:bg-gray-100 cursor-pointer"
                    @click="abrirModal(fazenda)">
                    <td class="py-2 px-4">{{ fazenda.id }}</td>
                    <td class="py-2 px-4">{{ fazenda.nome }}</td>
                    <td class="py-2 px-4">{{ fazenda.cargo }}</td>
                    <td class="py-2 px-4">{{ fazenda.dataCadastro }}</td>
                    <td class="py-2 px-4">{{ fazenda.admin }}</td>
                    <td class="py-2 px-4">
                        <span :class="fazenda.ativo ? 'text-green-600' : 'text-red-600'">
                            {{ fazenda.ativo ? 'Ativo' : 'Inativo' }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

        </div>
    </div>
    
</div> 
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheFarmModal from '@/components/TheFarmModal.vue';

export default {
    name: 'TheUsers',
    components: {
        TheSidebar,
        TheFarmModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            mostrar: false,
            fazendaSelecionada: null,
            fazendas: [
                {
                    id: 1,
                    nome: 'Roberto',
                    cargo: 'Capataz',
                    dataCadastro: '2023-05-10',
                    admin: 'Master',
                },
                {
                    id: 2,
                    nome: 'Carlos',
                    cargo: 'Inspetor de qualidade',
                    dataCadastro: '2023-06-15',
                    admin: 'Admin',
                },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        cadastrarFazenda() {
            this.fazendaSelecionada = null;
            this.mostrar = true;
        },
        abrirModal(fazenda) {
            this.fazendaSelecionada = fazenda;
            this.mostrar = true;
        },
        fecharModal() {
            this.mostrar = false;
            this.fazendaSelecionada = null;
        }
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

