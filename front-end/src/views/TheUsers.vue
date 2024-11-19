<template>
    <div class="flex-grow-1 bg-[url('@/assets/imgs/BgColor.png')] flex h-screen bg-cover">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <i class="fa fa-bars fa-2x cursor-pointer p-2 mt-5" aria-hidden="true" @click="toggleSidebar"></i>

        <div class="flex-grow -ml-1">
        <div class='h-56'> <!-- Div Superior -->
            
    <div class="justify-items-center mt-4 ">
        <div class="w-auto  justify-items-center mr-[6em]">
            <h class='text-[2.0rem] center noto-sans-400'>Usuários</h>
            <hr class='w-[14rem] mt-2 -mb-3 border-black border-1.5'>
            <p class='mt-6 noto-sans-300'>Selecione o que você deseja cadastrar ou atualizar</p>
        </div>
    </div>

    <div class="flex mt-[4.17em] noto-sans-700 items-center"> <!-- Div engloba Barra filtros e botao cadastrar -->
        
        <!-- Div Barra filtros -->
        <div class=" flex items-center bg-zinc-50 rounded-lg border border-gray-300 shadow relative py-1.5"> <!--Div Filtro-->
            
            <div class="border-r border-gray-300 px-5 py-3 flex items-center">
                <img class="w-5 h-5" src="../assets/imgs/filter.png" alt="Filtro" />
            </div>
            
            <div class="px-5 py-3 noto-sans-700">
                <p class="text-sm">Filtro</p>
            </div>

            <div @mouseenter="showDropdown.data = true" @mouseleave="showDropdown.data = false"
            class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm noto-sans-700 mr-6">Data</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                <ul v-show="showDropdown.data"
                class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-[7.3rem]">
                    <li @click="sortByDate('asc')" class="px-2 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Mais Antigo</li>
                    <li @click="sortByDate('desc')" class="px-2 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Mais Novo</li>
                </ul>
            </div>

            <div @mouseenter="showDropdown.ordenar = true" @mouseleave="showDropdown.ordenar = false"
            class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm noto-sans-700 mr-6">Ordenar Por</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                <ul v-show="showDropdown.ordenar"
                class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-[10.5rem]">
                    <li @click="sortByName" class="px-5 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Nome</li>
                    <li @click="sortByRole" class="px-5 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Cargo</li>
                </ul>
            </div>

            <div @mouseenter="showDropdown.status = true" @mouseleave="showDropdown.status = false"
            class="border-l border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm noto-sans-700 mr-6">Status</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                <ul v-show="showDropdown.status"
                class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                    <li @click="filterByStatus('ativo')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Ativo</li>
                    <li @click="filterByStatus('inativo')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm noto-sans-700">Inativo</li>
                </ul>
            </div>

            <div class="border-l border-gray-300 px-5 flex items-center space-x-1 text-red-600 cursor-pointer"
            @click="clearFilters">
            <i class="fa fa-refresh" aria-hidden="true"></i>
            <p class="text-sm noto-sans-700">Limpar Filtro</p>
            </div>
        </div>


        <!-- Botão -->
        <button @click="cadastrarUsuario" class="noto-san-700 bg-teal-600 bg-opacity-50 hover:bg-teal-700 text-sm w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[3%]">
            + CADASTRAR USUÁRIO
        </button>

    </div>
    </div>
    
    <div> 
    <div> 
        
        <div class="flex-1 overflow-y-auto mt-5 max-h-[25.87em]">
            <table class="w-[98%] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                <thead class="bg-white border-b-2 rounded-t-lg">
                    <tr class="rounded-lg">
                        <th class="py-2.5 px-4 text-left text-gray-700">ID</th>
                        <th class="py-2.5 px-4 text-left text-gray-700">Email</th>
                        <th class="py-2.5 px-4 text-left text-gray-700">Cargo</th>
                        <th class="py-2.5 px-4 text-left text-gray-700">Data Cadastro</th>
                        <th class="py-2.5 px-4 text-left text-gray-700">Admin</th>
                        <th class="py-2.5 px-4 text-left text-gray-700">Status</th>
                    </tr>
                </thead>
                <tbody class="rounded-b-lg">
                    <tr v-if="filteredUsuarios.length === 0">
                        <td colspan="6" class="py-4 text-center text-gray-500">Nenhum usuário encontrado.</td>
                    </tr>
                    <tr v-for="(usuario, index) in filteredUsuarios" :key="usuario.id"
                        class="hover:bg-gray-50 cursor-pointer" @click="abrirModal(usuario)">
                        <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
                        <td class="py-2 px-4 border-b">{{ usuario.email }}</td>
                        <td class="py-2 px-4 border-b">{{ usuario.ocupation?.ocupation_name || 'N/A' }}</td>
                        <td class="py-2 px-4 border-b">{{ formatarData(usuario.created_at) }}</td>
                        <td class="py-2 px-4 border-b">{{ usuario.master ? 'Sim' : 'Não' }}</td>
                        <td class="py-2 px-4 border-b">
                            <span :class="usuario.status_active ? 'text-green-600' : 'text-red-600'">
                                {{ usuario.status_active ? 'Ativo' : 'Inativo' }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <TheUserModal v-if="mostrar" :usuario="usuarioSelecionado" @close="fecharModal" />
    </div>
</div>
    
</div> 
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheUserModal from '@/components/TheUserModal.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    name: 'TheUsers',
    components: {
        TheSidebar,
        TheUserModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            mostrar: false,
            usuarioSelecionado: null,
            usuarios: [],
            selectedStatus: '',
            selectedOrder: '',
            selectedDateOrder: '',
            showDropdown: {
                data: false,
                ordenar: false,
                status: false
            }
        };
    },
    computed: {
        filteredUsuarios() {
            let filtered = [...this.usuarios];
            if (this.selectedStatus) {
                filtered = filtered.filter(usuario => usuario.status === this.selectedStatus);
            }
            if (this.selectedOrder === 'nome') {
                filtered.sort((a, b) => a.nome.localeCompare(b.nome));
            } else if (this.selectedOrder === 'cargo') {
                filtered.sort((a, b) => a.cargo.localeCompare(b.cargo));
            }
            if (this.selectedDateOrder === 'asc') {
                filtered.sort((a, b) => new Date(a.dataCadastro) - new Date(b.dataCadastro));
            } else if (this.selectedDateOrder === 'desc') {
                filtered.sort((a, b) => new Date(b.dataCadastro) - new Date(a.dataCadastro));
            }
            return filtered;
        },
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        cadastrarUsuario() {
            this.usuarioSelecionado = {
                name: '',
                email: '',
                password: '',
                status_active: true,
                ocupationId: 1
            };
            this.mostrar = true;
        },
        abrirModal(usuario) {
            this.usuarioSelecionado = usuario;
            this.mostrar = true;
        },
        fecharModal() {
            this.mostrar = false;
        },
        formatarData(data) {
            return new Date(data).toLocaleDateString('pt-BR');
        },
        sortByDate(order) {
            this.selectedDateOrder = order;
        },
        sortByName() {
            this.selectedOrder = 'nome';
        },
        sortByRole() {
            this.selectedOrder = 'cargo';
        },
        filterByStatus(status) {
            this.selectedStatus = status;
        },
        clearFilters() {
            this.selectedStatus = '';
            this.selectedOrder = '';
            this.selectedDateOrder = '';
        },
        carregarUsuarios() {
            api.get('/api/users').then(response => {
                this.usuarios = response.data;
            });
        }
    },
    created() {
        this.carregarUsuarios();
    }
};
</script>

<style scoped>
.container_fazenda {
    background-color: rgba(0, 0, 255, 0.477);
    width: 100vw;
    height: 100vh;
}
</style>