<template>
    <div class="flex-grow-1 bg-[url('@/assets/imgs/BgColor.png')] flex h-screen bg-cover">        
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-white flex flex-col">
            <div class="flex items-center h-20 bg-white relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl noto-sans-400 absolute left-1/2 transform -translate-x-1/2">
                    Cadastro - Animais
                </span>
            </div>

            <!-- Cabeçalho com Filtro à Esquerda e Cadastrar à Direita -->
            <div class="flex justify-between items-center p-4 bg-white">
                <!-- Filtro à esquerda -->
                <div class="flex items-center space-x-4">
                    <input type="text" v-model="searchQuery" placeholder="Filtrar por nome ou brinco"
                        class="p-2 border rounded-lg" />
                    <button @click="applyFilter" class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2">
                        <i class="fa fa-search"></i> Buscar
                    </button>
                </div>

                <!-- Botão Cadastrar à Direita -->
                <div class="flex space-x-4">
                    <button @click="openAnimalModal"
                    class="noto-san-700 bg-teal-600 bg-opacity-50 text-sm font-bold w-56 h-11 hover:bg-teal-700 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85em]">
                    <i class="fa fa-plus mr-2"></i>
                        CADASTRAR ANIMAL
                    </button>
                </div>
            </div>

            <!-- Tabela de Animais -->
            <div class="flex-1 overflow-y-auto mt-5">
                <table class="w-[97.0%] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <thead class="bg-white border-b-2 rounded-t-lg">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">N° Brinco</th>
                            <th class="py-2 px-4 text-left text-gray-700">Nome</th>
                            <th class="py-2 px-4 text-left text-gray-700">Lote</th>
                            <th class="py-2 px-4 text-left text-gray-700">Idade</th>
                            <th class="py-2 px-4 text-left text-gray-700">Inseminação</th>
                            <th class="py-2 px-4 text-left text-gray-700">Sexo</th>
                            <th class="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="animal in filteredAnimals" :key="animal.id" class="hover:bg-gray-100 cursor-pointer"
                            @click="openAnimalModal(animal)">
                            <td class="py-2 px-4 border-b">{{ animal.earring }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.name_animal }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.patch.patch_name }}</td>
                            <td class="py-2 px-4 border-b">{{ calculateAge(animal.birthdate) }} anos</td>
                            <td class="py-2 px-4 border-b">{{ animal.last_childbirth || 'N/A' }}</td>
                            <td class="py-2 px-4 border-b">{{ animal.gender }}</td>
                            <td class="py-2 px-4 border-b">
                                <span :class="animal.status_active ? 'text-green-600' : 'text-red-600'">
                                    {{ animal.status_active ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal de Cadastro de Animal -->
        <TheAnimalModal :isModalOpen="isAnimalModalOpen" :animalData="selectedAnimal" :isEditMode="!!selectedAnimal"
            @close="closeAnimalModal" @save="saveAnimal" />
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheAnimalModal from '../components/TheAnimalModal.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    components: {
        TheSidebar,
        TheAnimalModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            isAnimalModalOpen: false,
            selectedAnimal: null,
            animals: [],
            searchQuery: '',
        };
    },
    computed: {
        filteredAnimals() {
            return this.animals.filter(animal => {
                return (
                    animal.name_animal.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    animal.earring.includes(this.searchQuery)
                );
            });
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        openAnimalModal(animal = null) {
            this.selectedAnimal = animal || {
                name_animal: '',
                gender: '',
                race: '',
                coat: '',
                species: '',
                patch: '',
                status_active: true,
                earring: '',
                birthdate: '',
                last_childbirth: '',
                weight: '',
                notes: '',
            };
            this.isAnimalModalOpen = true;
        },
        closeAnimalModal() {
            this.isAnimalModalOpen = false;
            this.selectedAnimal = null;
        },
        saveAnimal(animal) {
            if (this.selectedAnimal.id) {
                api.put(`/api/animals/${this.selectedAnimal.id}`, animal)
                    .then(() => this.loadAnimals());
            } else {
                api.post('/api/animals', animal)
                    .then(() => this.loadAnimals());
            }
            this.closeAnimalModal();
        },
        loadAnimals() {
            api.get('/api/animals')
                .then(response => {
                    this.animals = response.data;
                })
                .catch(error => {
                    console.error('Erro ao carregar animais:', error);
                });
        },
        calculateAge(birthdate) {
            const birth = new Date(birthdate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const month = today.getMonth();
            if (month < birth.getMonth() || (month === birth.getMonth() && today.getDate() < birth.getDate())) {
                age--;
            }
            return age;
        },
        applyFilter() {
            this.filteredAnimals();
        },
    },
    mounted() {
        this.loadAnimals();
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