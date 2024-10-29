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
                    <input type="text" v-model="filterBangle" placeholder="Brinco"
                        class="border-l border-gray-300 p-3 text-sm" />
                    <input type="text" v-model="filterBatch" placeholder="Lote"
                        class="border-l border-gray-300 p-3 text-sm" />
                    <div @mouseenter="showDropdown.sexo = true" @mouseleave="showDropdown.sexo = false"
                        class="border-l border-r border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Sexo</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.sexo"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li @click="filterByGender('Fêmea')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                Fêmea</li>
                            <li @click="filterByGender('Macho')" class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                                Macho</li>
                        </ul>
                    </div>
                    <div @mouseenter="showDropdown.status = true" @mouseleave="showDropdown.status = false"
                        class="border-l border-r border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
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
                { id: 3, brinco: 'C789', nome: 'Fiona', lote: 'Lote 1', idade: 2, ultimaInseminacao: '2023-08-15', sexo: 'Fêmea', ativo: true },
                { id: 4, brinco: 'D101', nome: 'Thor', lote: 'Lote 3', idade: 5, ultimaInseminacao: null, sexo: 'Macho', ativo: true },
                { id: 5, brinco: 'E112', nome: 'Luna', lote: 'Lote 2', idade: 3, ultimaInseminacao: '2023-06-10', sexo: 'Fêmea', ativo: false },
            ],
            showDropdown: {
                sexo: false,
                status: false,
            },
            filterBangle: '',
            filterBatch: '',
            filterGender: null,
            selectedStatus: null,
        };
    },
    computed: {
        filteredAnimals() {
            let filtered = [...this.animals];
            if (this.filterBangle) {
                filtered = filtered.filter(animal =>
                    animal.brinco.toLowerCase().includes(this.filterBangle.toLowerCase())
                );
            }
            if (this.filterBatch) {
                filtered = filtered.filter(animal =>
                    animal.lote.toLowerCase().includes(this.filterBatch.toLowerCase())
                );
            }
            if (this.filterGender) {
                filtered = filtered.filter(animal => animal.sexo === this.filterGender);
            }
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
            //função para chamar o modal  quando ele ficar pronto
            alert("Cadastrar Animal");
        },
        abrirModal(animal) {
            //função para chamar o modal  quando ele ficar pronto
            alert(`Detalhes do animal: ${animal.nome}`);
        },
        filterByGender(gender) {
            this.filterGender = gender;
            this.showDropdown.sexo = false;
        },
        filterByStatus(status) {
            this.selectedStatus = status;
            this.showDropdown.status = false;
        },
        clearFilters() {
            this.filterBangle = '';
            this.filterBatch = '';
            this.filterGender = null;
            this.selectedStatus = null;
        },
    },
};
</script>

<style scoped></style>
