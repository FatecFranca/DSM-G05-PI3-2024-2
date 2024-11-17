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
                        <tr v-if="filteredInfos.length === 0">
                            <td colspan="4" class="py-2 px-4 text-center text-gray-500">Nenhuma informação disponível
                            </td>
                        </tr>
                        <tr v-for="info in filteredInfos" :key="info.id" class="hover:bg-gray-100 cursor-pointer"
                            @click="openInfoModal(info)">
                            <td class="py-2 px-4 border-b">{{ info.subject }}</td>
                            <td class="py-2 px-4 border-b">{{ info.category }}</td>
                            <td class="py-2 px-4 border-b">{{ info.description }}</td>
                            <td class="py-2 px-4 border-b">{{ formatDate(info.created_at) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TheInfoModal :isOpen="isModalOpen" :info="infoToEdit" @save-info="saveInfo" @close="closeModal" />
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import TheSidebar from '../components/TheSidebar.vue';
import TheInfoModal from '../components/TheInfoModal.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    name: 'TheInfos',
    components: {
        TheSidebar,
        TheInfoModal,
    },
    setup() {
        const isSidebarVisible = ref(false);
        const isModalOpen = ref(false);
        const infoToEdit = ref({
            subject: '',
            category: '',
            description: '',
            created_at: '',
        });
        const infos = ref([]);

        const toggleSidebar = () => {
            isSidebarVisible.value = !isSidebarVisible.value;
        };

        const openModal = () => {
            infoToEdit.value = { subject: '', category: '', description: '', created_at: '' };
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
            infoToEdit.value = { subject: '', category: '', description: '', created_at: '' };
        };

        const openInfoModal = (info) => {
            infoToEdit.value = { ...info, created_at: info.created_at.split('T')[0] };
            isModalOpen.value = true;
        };

        const saveInfo = async (updatedInfo) => {
            try {
                if (updatedInfo.id) {
                    await api.put(`/infos/${updatedInfo.id}`, updatedInfo);
                    const index = infos.value.findIndex((info) => info.id === updatedInfo.id);
                    if (index !== -1) {
                        infos.value[index] = updatedInfo;
                    }
                } else {
                    const response = await api.post('/infos', updatedInfo);
                    infos.value.push(response.data);
                }
                closeModal();
            } catch (error) {
                console.error('Erro ao salvar informação:', error);
            }
            fetchInfos();
        };

        const fetchInfos = async () => {
            try {
                const response = await api.get('/infos');
                infos.value = response.data;
            } catch (error) {
                console.error('Erro ao buscar informações:', error);
            }
        };

        const filteredInfos = computed(() => {
            return infos.value;
        });

        const formatDate = (date) => {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(date).toLocaleDateString('pt-BR', options);
        };

        fetchInfos();

        return {
            isSidebarVisible,
            isModalOpen,
            infoToEdit,
            infos,
            filteredInfos,
            toggleSidebar,
            openModal,
            closeModal,
            openInfoModal,
            saveInfo,
            formatDate,
        };
    },
};
</script>

<style scoped></style>
