<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Cadastro - Animais
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
                    <div class="border-l border-gray-300 p-3 flex items-center space-x-1 text-red-600 cursor-pointer"
                        @click="clearFilters">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        <p class="text-sm font-bold">Limpar Filtro</p>
                    </div>
                </div>
                <button @click="cadastrarAnimal" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Cadastrar Animal
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">Número Brinco</th>
                            <th class="py-2 px-4 text-left text-gray-700">Nome</th>
                            <th class="py-2 px-4 text-left text-gray-700">Lote</th>
                            <th class="py-2 px-4 text-left text-gray-700">Idade</th>
                            <th class="py-2 px-4 text-left text-gray-700">Última Inseminação</th>
                            <th class="py-2 px-4 text-left text-gray-700">Sexo</th>
                            <th class="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="animal in filteredAnimals" :key="animal.id" class="hover:bg-gray-100 cursor-pointer"
                            @click="abrirModal(animal)">
                            <td class="py-2 px-4 border-b">{{ animal.brinco }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.nome }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.lote }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.idade }} anos</td>
                            <td class="py-2 px-4 border-b">{{ animal.ultimaInseminacao || 'N/A' }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.sexo }}</td>
                            <td class="py-2 px-4 border-b">
                                <span :class="animal.ativo ? 'text-green-600' : 'text-red-600'">
                                    {{ animal.ativo ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'TheAnimals',
    components: {
        TheSidebar,
    },
    data() {
        return {
            isSidebarVisible: false,
            animals: [
                { id: 1, brinco: 'A123', nome: 'Bela', lote: 'Lote 1', idade: 3, ultimaInseminacao: '2023-07-21', sexo: 'Fêmea', ativo: true },
                { id: 2, brinco: 'B456', nome: 'Zorro', lote: 'Lote 2', idade: 4, ultimaInseminacao: null, sexo: 'Macho', ativo: false },
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
        filteredAnimals() {
            let filtered = [...this.animals];
            if (this.selectedStatus !== null) {
                filtered = filtered.filter(animal => animal.ativo === this.selectedStatus);
            }
            return filtered;
        },
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        cadastrarAnimal() {

        },
        abrirModal(animal) {
        },
        clearFilters() {
            this.selectedStatus = null;
            this.selectedOrder = null;
            this.selectedDateOrder = null;
        },
    },
};
</script>
