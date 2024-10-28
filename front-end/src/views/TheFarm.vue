<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Cadastro - Fazendas
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
                            <li @click="sortBySize" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Tamanho</li>
                        </ul>
                    </div>
                    <div @mouseenter="showDropdown.status = true" @mouseleave="showDropdown.status = false"
                        class="border-l border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Status</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.status"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li @click="filterByStatus(true)" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Ativo
                            </li>
                            <li @click="filterByStatus(false)" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                Inativo</li>
                        </ul>
                    </div>
                    <div class="border-l border-gray-300 p-3 flex items-center space-x-1 text-red-600 cursor-pointer"
                        @click="clearFilters">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        <p class="text-sm font-bold">Limpar Filtro</p>
                    </div>
                </div>
                <button @click="cadastrarFazenda" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Cadastrar Fazenda
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">Nome</th>
                            <th class="py-2 px-4 text-left text-gray-700">CNPJ</th>
                            <th class="py-2 px-4 text-left text-gray-700">Localização</th>
                            <th class="py-2 px-4 text-left text-gray-700">Data de Cadastro</th>
                            <th class="py-2 px-4 text-left text-gray-700">Tamanho</th>
                            <th class="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="fazenda in filteredFazendas" :key="fazenda.id"
                            class="hover:bg-gray-100 cursor-pointer" @click="abrirModal(fazenda)">
                            <td class="py-2 px-4 border-b">{{ fazenda.nome }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.cnpj }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.localizacao }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.dataCadastro }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.tamanho }}</td>
                            <td class="py-2 px-4 border-b">
                                <span :class="fazenda.ativo ? 'text-green-600' : 'text-red-600'">
                                    {{ fazenda.ativo ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <TheFarmModal v-if="mostrar" :fazenda="fazendaSelecionada" @close="fecharModal" />
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
            fazendaSelecionada: null,
            fazendas: [
                { id: 1, nome: 'Fazenda Bela Vista', cnpj: '12.345.678/0001-90', localizacao: 'Franca, São Paulo', dataCadastro: '2023-05-10', tamanho: '150 hectares', ativo: true },
                { id: 2, nome: 'Fazenda Primavera', cnpj: '98.765.432/0001-10', localizacao: 'São Tomás de Aquino, Minas Gerais', dataCadastro: '2023-06-15', tamanho: '200 hectares', ativo: false },
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
        filteredFazendas() {
            let filtered = [...this.fazendas];
            if (this.selectedStatus !== null) {
                filtered = filtered.filter(fazenda => fazenda.ativo === this.selectedStatus);
            }
            // Ordenação
            if (this.selectedOrder === 'nome') {
                filtered.sort((a, b) => a.nome.localeCompare(b.nome));
            } else if (this.selectedOrder === 'tamanho') {
                filtered.sort((a, b) => parseInt(a.tamanho) - parseInt(b.tamanho));
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
        },
        sortByDate(order) {
            this.selectedDateOrder = order;
            this.showDropdown.data = false;
        },
        sortByName() {
            this.selectedOrder = 'nome';
            this.showDropdown.ordenar = false;
        },
        sortBySize() {
            this.selectedOrder = 'tamanho';
            this.showDropdown.ordenar = false;
        },
        filterByStatus(status) {
            this.selectedStatus = status;
            this.showDropdown.status = false;
        },
        clearFilters() {
            this.selectedStatus = null;
            this.selectedOrder = null;
            this.selectedDateOrder = null;
        },
    },
};
</script>
