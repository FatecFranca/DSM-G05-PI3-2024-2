<template>
    <div class="flex-grow-1 bg-gray-100 flex h-screen bg-cover">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <i class="fa fa-bars fa-2x cursor-pointer p-2 mt-5" aria-hidden="true" @click="toggleSidebar"></i>

        <div class="flex-grow -ml-1">
            <div class='h-56'> <!-- Div Superior -->

                <div class="justify-items-center mt-4 ">
                    <div class="w-auto  justify-items-center mr-[6em]">
                        <h1 class='text-[2.0rem] center noto-sans-400'>Fazendas</h1>
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
                    <button @click="cadastrarFazenda"
                        class="noto-san-700 bg-teal-600 bg-opacity-50 text-sm hover:bg-teal-700 w-56 h-11 rounded-lg mt-[0.650rem] text-white ml-auto mr-[2.85em]">
                        + CADASTRAR FAZENDA
                    </button>

                </div>
            </div>

            <div> <!--Div Inferior-->
                <div> <!--Div quadro-->

                    <div class="flex-1 overflow-y-auto mt-5">
                        <table class="w-[97.0%] bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg">
                            <thead class="bg-white border-b-2 rounded-t-lg">
                                <tr>
                                    <th class="py-2 px-4 text-left text-gray-700">Nome</th>
                                    <th class="py-2 px-4 text-left text-gray-700">CNPJ</th>
                                    <th class="py-2 px-4 text-left text-gray-700">Localização</th>
                                    <th class="py-2 px-4 text-left text-gray-700">Data de Cadastro</th>
                                    <th class="py-2 px-4 text-left text-gray-700">Tamanho</th>
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

                    <TheFarmModal v-if="mostrar" :fazenda="fazendaSelecionada" @close="fecharModal"
                        @save="salvarFazenda" />
                </div>
            </div>

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

        mounted() {
            this.fetchFazendas();
        },

        async fetchFazendas() {
            try {
                const response = await api.get('api/farms');
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
