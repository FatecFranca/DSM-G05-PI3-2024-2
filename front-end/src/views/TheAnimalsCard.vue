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
                    class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
                    <i class="fa fa-filter mr-2"></i> Filtro
                </button>
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
            searchQuery: '',
            animals: [],
        };
    },
    computed: {
        filteredAnimals() {
            if (!this.searchQuery) return this.animals;
            return this.animals.filter(animal => animal.idTag.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        openFilter() {
            alert('Abrindo filtro.');
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
