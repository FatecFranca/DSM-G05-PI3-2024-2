<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Animais
                </span>
            </div>

            <div class="flex justify-between items-center p-4 bg-gray-50 shadow">
                <div class="flex items-center bg-white rounded-lg border border-gray-300 shadow">
                    <input type="text" v-model="searchQuery" placeholder="Pesquisar"
                        class="border-none p-3 text-sm rounded-l-lg w-96" />
                    <i class="fa fa-search text-gray-500 p-3"></i>
                </div>
                <button @click="openFilter"
                    class="bg-teal-600 text-white font-bold px-4 py-2 rounded hover:bg-teal-700 flex items-center">
                    <i class="fa fa-filter mr-2"></i> Filtro
                </button>
            </div>

            <div v-if="isFilterModalVisible"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div class="bg-white w-[300px] md:w-[500px] p-6 rounded-lg shadow-lg relative">
                    <h2 class="text-lg font-semibold mb-4">Filtros</h2>

                    <div class="space-y-4">
                        <div>
                            <label for="weight" class="block text-sm font-medium text-gray-700">Peso do Animal</label>
                            <select id="weight" v-model="filters.weight"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                <option value="">Selecione Peso</option>
                                <option value="100kg-200kg">100kg-200kg </option>
                                <option value="201kg-300kg">201kg-300kg</option>
                                <option value="301kg-400kg">301kg-400kg</option>
                            </select>
                        </div>

                        <div>
                            <label for="age" class="block text-sm font-medium text-gray-700">Idade</label>
                            <select id="age" v-model="filters.age"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                <option value="">Selecione a Idade</option>
                                <option value="1-2">1-2 anos</option>
                                <option value="3-4">3-4 anos</option>
                                <option value="5+">5+ anos</option>
                            </select>
                        </div>

                        <div>
                            <label for="health" class="block text-sm font-medium text-gray-700">Estado de Saúde</label>
                            <select id="health" v-model="filters.health"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                <option value="">Selecione o Estado de Saúde</option>
                                <option value="saudável">Saudável</option>
                                <option value="doente">Doente</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div>
                        <label for="medicineTime" class="block text-sm font-medium text-gray-700">Horário de
                            Medicação</label>
                        <input type="text" id="medicineTime" v-model="filters.medicineTime" placeholder="Ex: 14h"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>
                    <br>
                    <div>
                        <label for="inseminationDate" class="block text-sm font-medium text-gray-700">Data de
                            Inseminação</label>
                        <input type="text" id="inseminationDate" v-model="filters.inseminationDate"
                            placeholder="Ex: 20/03"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                    </div>

                    <div class="mt-6 flex justify-end gap-4">
                        <button @click="clearFilters"
                            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Limpar</button>
                        <button @click="applyFilters"
                            class="bg-green-600 text-white px-4 py-2 rounded-md">Aplicar</button>
                    </div>

                    <button @click="closeFilterModal" class="absolute top-2 right-2 text-gray-600 hover:text-red-600">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="animal in filteredAnimals" :key="animal.id" class="bg-white rounded-lg shadow-lg p-4">
                    <img :src="animal.img_animal || '../assets/imgs/cow1.png'" alt="Animal"
                        class="w-full h-40 object-cover rounded-t-lg" />
                    <div class="p-3">
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-1">{{ animal.earring }}</h3>
                            <p class="text-green-500 font-bold">Saudável e vacinada</p>
                        </div>
                        <div class="flex">
                            <div class="flex-1">
                                <p class="text-sm text-gray-500 font-bold">Atualizações:</p>
                                <ul class="text-sm text-gray-700 mb-1">
                                    <li>Medicado: {{ animal.medicineTime }}</li>
                                    <li>Inseminada: {{ animal.inseminationDate }}</li>
                                    <li>Peso Atual: {{ animal.weight || 'N/A' }}</li>
                                </ul>
                            </div>
                            <div class="pr-4 flex flex-col">
                                <p class="text-sm text-gray-500 font-bold">Informações:</p>
                                <ul class="text-sm text-gray-700">
                                    <li>Vacinação: {{ animal.vaccinationDate }}</li>
                                    <li>Lote: {{ animal.lote || 'N/A' }}</li>
                                    <li>Parto: {{ animal.lastChildbirth || 'N/A' }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    name: 'TheAnimalsCard',
    components: {
        TheSidebar,
    },
    data() {
        return {
            isSidebarVisible: false,
            isFilterModalVisible: false,
            searchQuery: '',
            animals: [],
            filters: {
                weight: '',
                age: '',
                health: '',
                medicineTime: '',
                inseminationDate: '',
            },
        };
    },
    computed: {
        filteredAnimals() {
            let filtered = this.animals;
            if (this.searchQuery) {
                filtered = filtered.filter(animal => animal.idTag.toLowerCase().includes(this.searchQuery.toLowerCase()));
            }
            if (this.filters.weight) {
                filtered = filtered.filter(animal => animal.weight === this.filters.weight);
            }
            if (this.filters.age) {
                filtered = filtered.filter(animal => animal.age === this.filters.age);
            }
            if (this.filters.health) {
                filtered = filtered.filter(animal => animal.health === this.filters.health);
            }
            if (this.filters.medicineTime) {
                filtered = filtered.filter(animal => animal.medicineTime === this.filters.medicineTime);
            }
            if (this.filters.inseminationDate) {
                filtered = filtered.filter(animal => animal.inseminationDate === this.filters.inseminationDate);
            }
            return filtered;
        },
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        openFilter() {
            this.isFilterModalVisible = true;
        },
        closeFilterModal() {
            this.isFilterModalVisible = false;
        },
        clearFilters() {
            this.filters = { weight: '', age: '', health: '', medicineTime: '', inseminationDate: '' };
        },
        applyFilters() {
            this.closeFilterModal();
        },
        async fetchAnimals() {
            try {
                const response = await api.get('api/animals');
                this.animals = response.data;
                console.log('Dados dos animais:', this.animals);
            } catch (error) {
                console.error('Erro ao buscar os dados dos animais:', error);
            }
        },
    },
    mounted() {
        this.fetchAnimals();
    },
};
</script>

<style scoped>
.bg-blue-200 {
    background-color: #E0F2FE;
}

.bg-green-600 {
    background-color: #16A34A;
}
</style>
