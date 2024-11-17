<template>
    <div class="flex-grow-1 bg-[url('@/assets/imgs/BgColor.png')] flex h-screen bg-cover">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <i class="fa fa-bars fa-2x cursor-pointer p-2 mt-5" aria-hidden="true" @click="toggleSidebar"></i>

        <div class="flex-grow -ml-1">
        <div class='h-56'> <!-- Div Superior -->
            
        <div class="justify-items-center mt-4 ">
            <div class="w-auto  justify-items-center mr-[6em]">
                <h class='text-[2.0rem] center noto-sans-400'>Informações</h>
                <hr class='w-[14rem] mt-2 -mb-3 border-black border-1.5'>
                <p class='mt-6 noto-sans-300'>Selecione o que você deseja cadastrar ou atualizar</p>
            </div>
        </div>

    <div class="flex mt-[4.17em] ml-[] noto-sans-700 items-center"> <!-- Div engloba Barra filtros e botao cadastrar -->
        
        <!-- Div Barra filtros -->
        <div class=" flex items-center bg-zinc-50 rounded-lg border border-gray-300 shadow relative py-1.5"> <!--Div Filtro-->
            
            <div class="border-r border-gray-300 px-5 py-3 flex items-center">
                <img class="w-5 h-5" src="../assets/imgs/filter.png" alt="Filtro" />
            </div>
            
            <div class="px-5 py-3 noto-sans-700">
                <p class="text-sm">Filtro</p>
            </div>

            <div class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm noto-sans-700 mr-6">Data</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
            </div>

            <div class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm mr-5">Categoria</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
            </div>

            <div class="border-l border-r border-gray-300 px-5 py-3 flex items-center space-x-1 text-gray-800 cursor-pointer relative">
                <p class="text-sm mr-5">Assunto</p>
                <i class="fa fa-chevron-down mb-1" aria-hidden="true"></i>
            </div>

            <div class="border-l border-gray-300 px-5 flex items-center space-x-1 text-red-600 cursor-pointer"
            @click="clearFilters">
            <i class="fa fa-refresh" aria-hidden="true"></i>
            <p class="text-sm noto-sans-700">Limpar Filtro</p>
            </div>
        </div>


        <!-- Botão -->
        <button @click="openModal" class="noto-san-700 bg-teal-600 bg-opacity-50 text-sm w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85em]">
            + CADASTRAR INFORMAÇÃO
        </button>

    </div>
    </div>
    
    <div> <!--Div Inferior-->
        <div> <!--Div quadro-->
            
            <div class="flex-1 overflow-y-auto mt-5">
                <table class="w-[97.0%] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">                    <thead class="bg-white border-b-2 rounded-t-lg">
                        <tr class="rounded-lg">
                            <th class="py-2 px-4 text-left text-gray-700">Assunto</th>
                            <th class="py-2 px-4 text-left text-gray-700">Categoria</th>
                            <th class="py-2 px-4 text-left text-gray-700">Descrição</th>
                            <th class="py-2 px-4 text-left text-gray-700">Data</th>
                        </tr>
                    </thead>
                    <tbody class="rounded-b-lg">
                        <tr v-for="info in filteredInfos" :key="info.id"
                        @click="openInfoModal(info)" class="hover:bg-gray-50 cursor-pointer">
                            <td class="py-2 px-4 border-b">{{ info.subject }}</td>
                            <td class="py-2 px-4 border-b">{{ info.category }}</td>
                            <td class="py-2 px-4 border-b">{{ info.description }}</td>
                            <td class="py-2 px-4 border-b">{{ formatDate(info.created_at) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <TheInfoModal :isOpen="isModalOpen" :info="infoToEdit" @save-info="saveInfo" @close="closeModal" />        </div>
    </div>
    
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

<style scoped>
.container_fazenda {
    background-color: rgba(0, 0, 255, 0.477);
    width: 100vw;
    height: 100vh;
}
</style>

