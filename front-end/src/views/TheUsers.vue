<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Cadastro - Usuários
                </span>
            </div>
            <div class="flex justify-between items-center p-4 bg-gray-50 shadow">
                <div class="flex items-center bg-white rounded-lg border border-gray-300 shadow relative">
                    <div class="border-r border-gray-300 p-3 flex items-center">
                        <img class="w-5 h-5" src="../assets/imgs/filter.png" alt="Filtro" />
                    </div>
                    <div class="p-3 font-bold">
                        <p class="text-sm">Filtro</p>
                    </div>
                    <div @mouseenter="showDropdown.data = true" @mouseleave="showDropdown.data = false"
                        class="border-l border-r border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Data</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.data"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li @click="sortByDate('asc')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Mais
                                Antigo</li>
                            <li @click="sortByDate('desc')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Mais Novo
                            </li>
                        </ul>
                    </div>
                    <div @mouseenter="showDropdown.ordenar = true" @mouseleave="showDropdown.ordenar = false"
                        class="border-l border-r border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Ordenar Por</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.ordenar"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li @click="sortByName" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Nome</li>
                            <li @click="sortByRole" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Cargo</li>
                        </ul>
                    </div>
                    <div @mouseenter="showDropdown.status = true" @mouseleave="showDropdown.status = false"
                        class="border-l border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Status</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.status"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li @click="filterByStatus('ativo')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                Ativo</li>
                            <li @click="filterByStatus('inativo')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                Inativo</li>
                        </ul>
                    </div>
                    <div class="border-l border-gray-300 p-3 flex items-center space-x-1 text-red-600 cursor-pointer"
                        @click="clearFilters">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        <p class="text-sm font-bold">Limpar Filtro</p>
                    </div>
                </div>
                <button @click="cadastrarUsuario" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Cadastrar Usuário
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">ID</th>
                            <th class="py-2 px-4 text-left text-gray-700">Usuário</th>
                            <th class="py-2 px-4 text-left text-gray-700">Cargo</th>
                            <th class="py-2 px-4 text-left text-gray-700">Data Cadastro</th>
                            <th class="py-2 px-4 text-left text-gray-700">Admin</th>
                            <th class="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in filteredUsuarios" :key="usuario.id"
                            class="hover:bg-gray-100 cursor-pointer" @click="abrirModal(usuario)">
                            <td class="py-2 px-4 border-b">{{ usuario.id }}</td>
                            <td class="py-2 px-4 border-b">{{ usuario.nome }}</td>
                            <td class="py-2 px-4 border-b">{{ usuario.cargo }}</td>
                            <td class="py-2 px-4 border-b">{{ usuario.dataCadastro }}</td>
                            <td class="py-2 px-4 border-b">{{ usuario.admin }}</td>
                            <td class="py-2 px-4 border-b">
                                <span :class="usuario.status === 'ativo' ? 'text-green-600' : 'text-red-600'">
                                    {{ usuario.status === 'ativo' ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TheUserModal v-if="mostrar" :usuario="usuarioSelecionado" @close="fecharModal" />
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheUserModal from '@/components/TheUserModal.vue';

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
            usuarios: [
                { id: 1, nome: 'Roberto Silva', cargo: 'Capataz', dataCadastro: '2023-05-10', admin: 'Master', status: 'ativo' },
                { id: 2, nome: 'Carlos Pereira', cargo: 'Veterinário', dataCadastro: '2023-06-15', admin: 'Admin', status: 'ativo' },
                { id: 3, nome: 'Ana Costa', cargo: 'Auxiliar de Ordenha', dataCadastro: '2023-04-20', admin: 'Usuário', status: 'ativo' },
                { id: 4, nome: 'João Souza', cargo: 'Trabalhador Rural', dataCadastro: '2023-07-01', admin: 'Usuário', status: 'ativo' },
                { id: 5, nome: 'Fernanda Oliveira', cargo: 'Gerente de Produção', dataCadastro: '2023-08-22', admin: 'Admin', status: 'ativo' },
                { id: 6, nome: 'Mariana Fernandes', cargo: 'Inseminadora', dataCadastro: '2023-09-14', admin: 'Usuário', status: 'inativo' },
                { id: 7, nome: 'Bruno Almeida', cargo: 'Peão de Lida', dataCadastro: '2023-10-05', admin: 'Usuário', status: 'ativo' },
                { id: 8, nome: 'Paula Ramos', cargo: 'Nutricionista Animal', dataCadastro: '2023-08-28', admin: 'Usuário', status: 'ativo' },
            ],
            showDropdown: {
                data: false,
                ordenar: false,
                status: false,
            },
            selectedStatus: null,
            selectedOrder: null,
            selectedDateOrder: null,
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
            this.usuarioSelecionado = null;
            this.mostrar = true;
        },
        abrirModal(usuario) {
            this.usuarioSelecionado = usuario;
            this.mostrar = true;
        },
        fecharModal() {
            this.mostrar = false;
            this.usuarioSelecionado = null;
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
            this.selectedStatus = null;
            this.selectedOrder = null;
            this.selectedDateOrder = null;
        },
    },
};
</script>

<style scoped>
.table-container {
    overflow-x: auto;
}
</style>
