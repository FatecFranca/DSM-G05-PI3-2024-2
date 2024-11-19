<template>
    <div class="flex-grow-1 bg-gray-100 flex h-screen bg-cover">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <i class="fa fa-bars fa-2x cursor-pointer p-2 mt-5" aria-hidden="true" @click="toggleSidebar"></i>

        <div class="flex-grow -ml-1">
            <div class='h-56'> <!-- Div Superior -->

                <div class="justify-items-center mt-4 ">
                    <div class="w-auto  justify-items-center mr-[6em]">
                        <h class='text-[2.0rem] center noto-sans-400'>Animais</h>
                        <hr class='w-[14rem] mt-2 -mb-3 border-black border-1.5'>
                        <p class='mt-6 noto-sans-300'>Selecione o que você deseja cadastrar ou atualizar</p>
                    </div>
                </div>

                <div class="flex mt-[4.17em] ml-[] noto-sans-700 items-center">
                    <!-- Div engloba Barra filtros e botao cadastrar -->

                    <div class=" flex items-center bg-zinc-50 rounded-lg border border-gray-300 shadow relative py-1.5">
                        <!--Div Filtro-->

                        <div class="border-r border-gray-300 px-5 py-3 flex items-center">
                            <img class="w-5 h-5" src="../assets/imgs/filter.png" alt="Filtro" />
                        </div>

                        <div class="px-5 py-3 noto-sans-700">
                            <p class="text-sm">Filtro</p>
                        </div>

                        <div
                            class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                            <p class="text-sm noto-sans-700 mr-6">Data</p>
                            <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        </div>

                        <div
                            class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                            <p class="text-sm noto-sans-700 mr-6">Ordenar Por</p>
                            <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        </div>

                        <div
                            class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                            <p class="text-sm noto-sans-700 mr-6">Status</p>
                            <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        </div>

                        <div class="border-l border-gray-300 px-5 flex items-center space-x-1 text-red-600 cursor-pointer"
                            @click="clearFilters">
                            <i class="fa fa-refresh" aria-hidden="true"></i>
                            <p class="text-sm noto-sans-700">Limpar Filtro</p>
                        </div>
                    </div>


                    <!-- Botão -->
                    <button @click="openAnimalModal"
                        class="noto-san-700 bg-teal-600 bg-opacity-50 text-sm hover:bg-teal-700 w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85em]">
                        + CADASTRAR ANIMAL
                    </button>

                </div>
            </div>

            <div> <!--Div Inferior-->
                <div> <!--Div quadro-->

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
                                <tr v-for="animal in filteredAnimals" :key="animal.id"
                                    class="hover:bg-gray-100 cursor-pointer" @click="openAnimalModal(animal)">
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

                <TheAnimalModal :isModalOpen="isAnimalModalOpen" :animalData="selectedAnimal" :isEditMode="!!selectedAnimal"
                    @close="closeAnimalModal" @save="saveAnimal" />
                </div>
            </div>

        </div>
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