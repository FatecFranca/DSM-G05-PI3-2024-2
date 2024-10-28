<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    Cadastro - Informações
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
                    <div @mouseenter="showDropdown.categoria = true" @mouseleave="showDropdown.categoria = false"
                        class="border-l border-gray-300 p-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                        <p class="text-sm font-bold">Categoria</p>
                        <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
                        <ul v-show="showDropdown.categoria"
                            class="absolute top-12 left-0 bg-white shadow-lg rounded-md border w-32">
                            <li v-for="categoria in categorias" :key="categoria" @click="filterByCategoria(categoria)"
                                class="px-4 py-2 hover:bg-gray-200 cursor-pointer">{{ categoria }}</li>
                        </ul>
                    </div>
                    <select v-model="selectedAssunto"
                        class="border-l border-r border-gray-300 p-3 text-gray-800 cursor-pointer bg-white">
                        <option value="" disabled selected>Escolha um Assunto</option>
                        <option v-for="assunto in assuntos" :key="assunto" :value="assunto">{{ assunto }}</option>
                    </select>
                    <div class="border-l border-gray-300 p-3 flex items-center space-x-1 text-red-600 cursor-pointer"
                        @click="clearFilters">
                        <i class="fa fa-refresh" aria-hidden="true"></i>
                        <p class="text-sm font-bold">Limpar Filtro</p>
                    </div>
                </div>
                <button @click="openModal" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Cadastrar Informação
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">Assunto</th>
                            <th class="py-2 px-4 text-left text-gray-700">Categoria</th>
                            <th class="py-2 px-4 text-left text-gray-700">Descrição</th>
                            <th class="py-2 px-4 text-left text-gray-700">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="info in filteredInfos" :key="info.id" class="hover:bg-gray-100 cursor-pointer"
                            @click="openInfoModal(info)">
                            <td class="py-2 px-4 border-b">{{ info.assunto }}</td>
                            <td class="py-2 px-4 border-b">{{ info.categoria }}</td>
                            <td class="py-2 px-4 border-b">{{ info.descricao }}</td>
                            <td class="py-2 px-4 border-b">{{ info.data }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <TheInfoModal :isOpen="isModalOpen" :info="infoToEdit" @save-info="saveInfo" @close="closeModal" />
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheInfoModal from '../components/TheInfoModal.vue';

export default {
    name: 'TheInfos',
    components: {
        TheSidebar,
        TheInfoModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            isModalOpen: false,
            infoToEdit: {
                assunto: '',
                categoria: '',
                descricao: '',
                data: '',
                infos: [
                    { id: 1, assunto: 'Manuseio de Amostras', categoria: 'Higiene', descricao: 'Equipamentos limpos e desinfetados', data: '2023-10-12' },
                    { id: 2, assunto: 'Comportamento Animal', categoria: 'Manejo', descricao: 'Sinais de estresse nos animais', data: '2023-10-15' },
                    { id: 3, assunto: 'Pós Medicação', categoria: 'Manejo', descricao: 'Monitorar resposta após medicamentos', data: '2023-10-20' },
                    { id: 4, assunto: 'Vacinação', categoria: 'Saúde', descricao: 'Manejo antes e após vacinação', data: '2023-10-22' },
                ],
                assuntos: ['Manuseio de Amostras', 'Comportamento Animal', 'Pós Medicação', 'Vacinação'],
                categorias: ['Higiene', 'Manejo', 'Saúde'],
                showDropdown: {
                    data: false,
                    categoria: false,
                },
                selectedAssunto: '',
                selectedCategoria: null,
                selectedDateOrder: null,
            };
        },
            computed: {
            filteredInfos() {
                let filtered = [...this.infos];
                if (this.selectedAssunto) {
                    filtered = filtered.filter(info => info.assunto === this.selectedAssunto);
                }
                if (this.selectedCategoria) {
                    filtered = filtered.filter(info => info.categoria === this.selectedCategoria);
                }
                if (this.selectedDateOrder === 'asc') {
                    filtered.sort((a, b) => new Date(a.data) - new Date(b.data));
                } else if (this.selectedDateOrder === 'desc') {
                    filtered.sort((a, b) => new Date(b.data) - new Date(a.data));
                }
                return filtered;
            },
        },
        methods: {
            toggleSidebar() {
                this.isSidebarVisible = !this.isSidebarVisible;
            },
            openModal() {
                this.infoToEdit = {
                    assunto: '',
                    categoria: '',
                    descricao: '',
                    data: '',
                };
                this.isModalOpen = true;
            },
            closeModal() {
                this.isModalOpen = false;
                this.infoToEdit = null;
            },
            openInfoModal(info) {
                this.infoToEdit = { ...info };
                this.isModalOpen = true;
            },
            saveInfo(updatedInfo) {
                if (updatedInfo.id) {
                    const index = this.infos.findIndex(info => info.id === updatedInfo.id);
                    if (index !== -1) {
                        this.$set(this.infos, index, updatedInfo);
                    }
                } else {
                    updatedInfo.id = this.infos.length + 1;
                    this.infos.push(updatedInfo);
                }
                this.closeModal();
            },
            sortByDate(order) {
                this.selectedDateOrder = order;
                this.showDropdown.data = false;
            },
            filterByCategoria(categoria) {
                this.selectedCategoria = categoria;
                this.showDropdown.categoria = false;
            },
            clearFilters() {
                this.selectedAssunto = '';
                this.selectedCategoria = null;
                this.selectedDateOrder = null;
            },
        },
    };
</script>

<style scoped></style>
