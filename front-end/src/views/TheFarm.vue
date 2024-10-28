<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-400">
            <div class="flex items-center h-[85px] bg-red-50 relative">
                <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
                <span class="mt-[25px] mb-[35px] text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
                    Bem-vindo à Tela Fazenda!
                </span>
            </div>
            <div class="p-4">
                <div class="flex justify-end">
                    <button @click="cadastrarFazenda"
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Cadastrar Fazenda
                    </button>
                </div>
                <TheFarmModal v-if="mostrar" :fazenda="fazendaSelecionada" @close="fecharModal" />
                <div class="mt-6">
                    <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                        <thead class="bg-gray-200">
                            <tr>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Nome</th>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">CNPJ</th>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Localização</th>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Data de Cadastro
                                </th>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Tamanho</th>
                                <th class="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="fazenda in fazendas" :key="fazenda.id" class="hover:bg-gray-100 cursor-pointer"
                                @click="abrirModal(fazenda)">
                                <td class="py-2 px-4 border-b border-gray-300">{{ fazenda.nome }}</td>
                                <td class="py-2 px-4 border-b border-gray-300">{{ fazenda.cnpj }}</td>
                                <td class="py-2 px-4 border-b border-gray-300">{{ fazenda.localizacao }}</td>
                                <td class="py-2 px-4 border-b border-gray-300">{{ fazenda.dataCadastro }}</td>
                                <td class="py-2 px-4 border-b border-gray-300">{{ fazenda.tamanho }}</td>
                                <td class="py-2 px-4 border-b border-gray-300">
                                    <span :class="fazenda.ativo ? 'text-green-600' : 'text-red-600'">
                                        {{ fazenda.ativo ? 'Ativo' : 'Inativo' }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheFarmModal from '@/components/TheFarmModal.vue';

export default {
    name: 'TheFarm',
    components: {
        TheSidebar,
        TheFarmModal,
    },
    data() {
        return {
            isSidebarVisible: false,
            mostrar: false,
            fazendaSelecionada: null,
            fazendas: [
                {
                    id: 1,
                    nome: 'Fazenda Bela Vista',
                    cnpj: '12.345.678/0001-90',
                    localizacao: 'Franca, São Paulo',
                    dataCadastro: '2023-05-10',
                    tamanho: '150 hectares',
                    ativo: true,
                },
                {
                    id: 2,
                    nome: 'Fazenda Primavera',
                    cnpj: '98.765.432/0001-10',
                    localizacao: 'São Tomás de Aquino, Minas Gerais',
                    dataCadastro: '2023-06-15',
                    tamanho: '200 hectares',
                    ativo: false,
                },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        cadastrarFazenda() {
            this.fazendaSelecionada = null;
            this.mostrar = true;
        },
        abrirModal(fazenda) {
            this.fazendaSelecionada = fazenda;
            this.mostrar = true;
        },
        fecharModal() {
            this.mostrar = false;
            this.fazendaSelecionada = null;
        }
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
