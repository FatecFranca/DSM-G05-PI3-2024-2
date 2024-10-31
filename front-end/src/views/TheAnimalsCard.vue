<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Animais
                </span>
                <button @click="goBack"
                    class="absolute right-5 bg-blue-200 text-blue-800 px-4 py-2 rounded">Voltar</button>
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

            <div class="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="animal in filteredAnimals" :key="animal.id" class="bg-white rounded-lg shadow-lg p-4">
                    <img :src="animal.image" alt="Animal" class="w-full h-40 object-cover rounded-t-lg" />
                    <div class="p-3">
                        <h3 class="text-lg font-semibold mb-1">{{ animal.idTag }}</h3>
                        <p class="text-green-500 font-bold">Saudável e vacinada</p>
                        <p class="text-sm text-gray-500 mt-1">Atualizações:</p>
                        <ul class="text-sm text-gray-700 mb-1">
                            <li>Aplicação de remédio: {{ animal.medicineTime }}</li>
                            <li>Visita do veterinário: {{ animal.vetTime }}</li>
                        </ul>
                        <p class="text-sm text-gray-500">Agendamentos:</p>
                        <ul class="text-sm text-gray-700">
                            <li>Inseminação: {{ animal.inseminationDate }}</li>
                            <li>Vacinação: {{ animal.vaccinationDate }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'TheAnimalsCard',
    components: {
        TheSidebar,
    },
    data() {
        return {
            isSidebarVisible: false,
            searchQuery: '',
            animals: [
                { id: 1, idTag: 'VA-1629', image: '/assets/images/cow.jpg', medicineTime: '13h', vetTime: '16h', inseminationDate: '20/03', vaccinationDate: '25/03' },
                { id: 2, idTag: 'VA-1630', image: '/assets/images/cow.jpg', medicineTime: '14h', vetTime: '17h', inseminationDate: '22/03', vaccinationDate: '27/03' },
                { id: 3, idTag: 'VA-1631', image: '/assets/images/cow.jpg', medicineTime: '15h', vetTime: '18h', inseminationDate: '23/03', vaccinationDate: '28/03' },
                { id: 4, idTag: 'VA-1632', image: '/assets/images/cow.jpg', medicineTime: '12h', vetTime: '15h', inseminationDate: '24/03', vaccinationDate: '29/03' },
                { id: 5, idTag: 'VA-1633', image: '/assets/images/cow.jpg', medicineTime: '11h', vetTime: '14h', inseminationDate: '25/03', vaccinationDate: '30/03' },
                { id: 6, idTag: 'VA-1634', image: '/assets/images/cow.jpg', medicineTime: '10h', vetTime: '13h', inseminationDate: '26/03', vaccinationDate: '31/03' },
            ],
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
        goBack() {
            alert('Going back to the previous screen.');
        },
        openFilter() {
            alert('Opening filter options.');
        },
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
