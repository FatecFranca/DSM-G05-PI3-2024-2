<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">Cadastro -
                    Fazendas</span>
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
                <button @click="cadastrarFazenda" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    + Cadastrar Fazenda
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
                <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left text-gray-700">Nome</th>
                            <th class="py-2 px-4 text-left text-gray-700">CNPJ</th>
                            <th class="py-2 px-4 text-left text-gray-700">Localização</th>
                            <th class="py-2 px-4 text-left text-gray-700">N° Animais</th>
                            <th class="py-2 px-4 text-left text-gray-700">Data de Cadastro</th>
                            <th class="py-2 px-4 text-left text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="fazenda, index in fazendas" :key="fazenda.id"
                            class="hover:bg-gray-100 cursor-pointer" @click="abrirModal(fazenda)">
                            <td class="py-2 px-4 border-b">{{ fazenda.fantasy_name }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.cnpj }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.address }}</td>
                            <td class="py-2 px-4 border-b">{{ fazenda.num_animals }}</td>
                            <td class="py-2 px-4 border-b">{{ formatDate(fazenda.created_at) }}</td>
                            <td class="py-2 px-4 border-b">
                                <span :class="fazenda.status_active ? 'text-green-600' : 'text-red-600'">
                                    {{ fazenda.status_active ? 'Ativo' : 'Inativo' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TheFarmModal v-if="mostrar" :fazenda="fazendaSelecionada" @close="fecharModal" @save="salvarFazenda" />
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheFarmModal from '@/components/TheFarmModal.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    name: 'TheFarm',
    components: { TheSidebar, TheFarmModal },
    data() {
        return {
            isSidebarVisible: false,
            mostrar: false,
            fazendaSelecionada: null,
            fazendas: [],
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },

        async fetchFazendas() {
            try {
                const response = await api.get('/farms');
                this.fazendas = response.data;
            } catch (error) {
                console.error('Erro ao buscar fazendas:', error);
            }
        },

        salvarFazenda(fazenda) {
            if (!fazenda.id) {
                fazenda.created_at = new Date().toISOString();
            }

            if (fazenda.registration_date) {
                fazenda.registration_date = new Date(fazenda.registration_date).toISOString();
            }

            const request = fazenda.id
                ? api.put(`/farms/${fazenda.id}`, fazenda)
                : api.post('/farms', fazenda);

            request.then(() => {
                this.fetchFazendas();
                this.fecharModal();
            }).catch(error => console.error('Erro ao salvar fazenda:', error));
        },

        cadastrarFazenda() {
            this.fazendaSelecionada = {
                registration_date: new Date().toISOString(),
            };
            this.mostrar = true;
        },

        abrirModal(fazenda) {
            this.fazendaSelecionada = fazenda;
            this.mostrar = true;
        },

        fecharModal() {
            this.mostrar = false;
            this.fazendaSelecionada = null;
        },

        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            if (isNaN(d)) return '';
            return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
        },
    },

    created() {
        this.fetchFazendas();
    },
};
</script>
