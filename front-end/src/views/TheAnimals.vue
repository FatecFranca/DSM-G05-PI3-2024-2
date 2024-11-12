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
                <button @click="openFilterModal" class="flex items-center bg-white rounded-lg border border-gray-300 shadow p-3 font-bold">
                    <img class="w-5 h-5 mr-2" src="../assets/imgs/filter.png" alt="Filtro" />
                    Filtro
                </button>
                <TheAnimalModal />
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

        <!-- Modal de Filtro -->
        <div v-if="isFilterModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 class="text-xl font-bold mb-4">Filtros</h2>
                <div class="mb-4">
                    <input type="text" v-model="filterBangle" placeholder="Brinco"
                        class="w-full border border-gray-300 p-3 text-sm rounded" />
                </div>
                <div class="mb-4">
                    <input type="text" v-model="filterBatch" placeholder="Lote"
                        class="w-full border border-gray-300 p-3 text-sm rounded" />
                </div>
                <div class="mb-4">
                    <label class="font-bold">Sexo:</label>
                    <select v-model="filterGender" class="w-full border border-gray-300 p-3 text-sm rounded">
                        <option value="">Todos</option>
                        <option value="Fêmea">Fêmea</option>
                        <option value="Macho">Macho</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="font-bold">Status:</label>
                    <select v-model="selectedStatus" class="w-full border border-gray-300 p-3 text-sm rounded">
                        <option :value="null">Todos</option>
                        <option :value="true">Ativo</option>
                        <option :value="false">Inativo</option>
                    </select>
                </div>
                <div class="flex justify-end space-x-2">
                    <button @click="clearFilters" class="bg-gray-200 px-4 py-2 rounded">Limpar Filtro</button>
                    <button @click="closeFilterModal" class="bg-blue-600 text-white px-4 py-2 rounded">Aplicar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheAnimalModal from '../components/TheAnimalModal.vue';
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'TheAnimals',
    components: {
        TheSidebar,
        TheAnimalModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            isFilterModalOpen: false,
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
        openFilterModal() {
            this.isFilterModalOpen = true;
        },
        closeFilterModal() {
            this.isFilterModalOpen = false;
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
