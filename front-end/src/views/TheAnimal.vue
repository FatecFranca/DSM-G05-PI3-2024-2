<template>
    <div class="w-screen h-screen flex overflow-hidden">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col overflow-y-auto">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    ANIMAIS - VA-1629
                </span>
            </div>

            <div class="flex-1 flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div class="w-full lg:w-1/3 bg-green-50 rounded-lg shadow-md p-4">
                    <img src="../assets/imgs/cow1.png" alt="Animal Image"
                        class="w-full h-56 object-cover rounded-md mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <h2 class="text-xl font-bold">VA-1629</h2>
                        <div>
                            <button @click="toggleEdit"
                                class="bg-green-200 text-green-800 px-4 py-1 rounded-full hover:bg-green-300">
                                {{ isEditing ? 'Salvar' : 'Editar' }}
                            </button>
                            <button v-if="isEditing" @click="cancelEdit"
                                class="bg-red-200 text-red-800 px-4 py-1 rounded-full hover:bg-red-300 ml-2">
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <p>Qualidade do Produto: <span v-if="!isEditing">{{ animal.quality }}</span>
                        <input v-if="isEditing" v-model="animal.quality" class="border p-1 rounded w-full" />
                    </p>
                    <ul class="mt-4 space-y-2">
                        <li>Cor do pelo: <span v-if="!isEditing">{{ animal.coatColor }}</span>
                            <input v-if="isEditing" v-model="animal.coatColor" class="border p-1 rounded w-full" />
                        </li>
                        <li>Status de Coloração: <span v-if="!isEditing">{{ animal.colorStatus }}</span>
                            <input v-if="isEditing" v-model="animal.colorStatus" class="border p-1 rounded w-full" />
                        </li>
                        <li>Comprimento do bovino: <span v-if="!isEditing">{{ animal.length }}</span>
                            <input v-if="isEditing" v-model="animal.length" class="border p-1 rounded w-full" />
                        </li>
                        <li>Condição da Terra: Excelente</li>
                        <li>Número de Pragas: Nenhuma</li>
                        <li>Status de Hidratação: Adequado</li>
                        <li>Saúde do Bovino: Boa</li>
                    </ul>
                    <p class="mt-4 text-gray-500 text-sm">Atualizado dia: 17 de Agosto, 2024</p>
                </div>

                <div class="flex-1 bg-white rounded-lg shadow-md p-4">
                    <h3 class="text-xl font-semibold mb-4">ALERTAS</h3>
                    <div class="flex mb-4">
                        <button @click="openModal()"
                            class="bg-blue-200 text-blue-800 px-4 py-1 rounded-full hover:bg-blue-300">Anotar +</button>
                    </div>
                    <div class="space-y-2">
                        <div v-for="alert in alerts" :key="alert.id"
                            class="bg-yellow-100 p-2 rounded-md flex justify-between items-center">
                            <p>{{ alert.description }}</p>
                            <i class="fa fa-pencil cursor-pointer" @click="openModal(alert)"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 bg-white rounded-lg shadow-md p-4 mt-4">
                <h3 class="text-xl font-semibold">CRESCIMENTO DO ANIMAL</h3>
                <div class="flex mb-4">
                    <button @click="activeTab = 'growth'" :class="{ 'bg-blue-200': activeTab === 'growth' }"
                        class="px-4 py-2 rounded-l-md hover:bg-blue-300">Crescimento</button>
                    <button @click="activeTab = 'history'" :class="{ 'bg-blue-200': activeTab === 'history' }"
                        class="px-4 py-2 rounded-r-md hover:bg-blue-300">Histórico</button>
                </div>
                <div class="w-full h-96 bg-gray-100 flex items-center justify-center rounded-md">
                    <template v-if="activeTab === 'growth'">
                        <GrowthChart :growthData="growthChartData" />
                    </template>
                    <template v-else>
                        <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-4">
                            <thead class="bg-gray-200">
                                <tr>
                                    <th class="py-2 px-4 text-left text-gray-700">Data</th>
                                    <th class="py-2 px-4 text-left text-gray-700">Chamado</th>
                                    <th class="py-2 px-4 text-left text-gray-700">Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="call in calls" :key="call.id" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="py-2 px-4 border-b">{{ call.date }}</td>
                                    <td class="py-2 px-4 border-b">{{ call.title }}</td>
                                    <td class="py-2 px-4 border-b">
                                        <button @click="toggleDetails(call.id)" class="text-blue-600 hover:underline">
                                            {{ activeCall === call.id ? 'Ocultar' : 'Mostrar Detalhes' }}
                                        </button>
                                        <div v-if="activeCall === call.id" class="mt-2 text-gray-600">
                                            <p>{{ call.details }}</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </div>
            </div>

            <TheModalAlert :isOpen="showAlertModal" :alert="newAlertData" @close="closeModal" @save-alert="saveAlert" />
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import TheModalAlert from '../components/TheModalAlert.vue';
import GrowthChart from '../components/GrowthChart.vue';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default {
    name: 'AnimalDetails',
    components: {
        TheSidebar,
        TheModalAlert,
        GrowthChart,
    },
    data() {
        return {
            isSidebarVisible: false,
            isEditing: false,
            showAlertModal: false,
            newAlertData: {
                description: '',
                created_at: '',
            },
            alerts: [],
            animal: {
                quality: 'Alta',
                coatColor: 'Amarela',
                colorStatus: 'Normal',
                length: 'Longo',
            },
            activeTab: 'growth',
            activeCall: null,
            calls: [
                { id: 1, title: 'Chamada de vacinação', date: '10/10/2024', details: 'Vacinação realizada com sucesso.' },
                { id: 2, title: 'Chamada de alimentação', date: '15/10/2024', details: 'Alimentação ajustada conforme orientação.' },
                { id: 3, title: 'Chamada de inspeção', date: '20/10/2024', details: 'Inspeção realizada sem problemas.' },
                { id: 4, title: 'Chamada de manejo', date: '25/10/2024', details: 'Foi feita uma revisão do manejo na propriedade.' },
                { id: 5, title: 'Chamada de observação', date: '30/10/2024', details: 'Observação regular do animal concluída.' },
            ],
            growthChartData: [
                { year: new Date(2000, 0, 1), weight: 140, height: 80, circumference: 100, production: 110, nutrition: 170 },
                { year: new Date(2002, 0, 1), weight: 220, height: 90, circumference: 110, production: 145, nutrition: 195 },
                { year: new Date(2007, 0, 1), weight: 310, height: 100, circumference: 120, production: 175, nutrition: 215 },
                { year: new Date(2011, 0, 1), weight: 370, height: 105, circumference: 130, production: 200, nutrition: 230 },
                { year: new Date(2016, 0, 1), weight: 450, height: 110, circumference: 140, production: 230, nutrition: 250 },
            ],
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        },
        toggleEdit() {
            this.isEditing = !this.isEditing;
        },
        cancelEdit() {
            this.isEditing = false;
            this.loadAnimalData();
        },
        openModal(alert = null) {
            this.showAlertModal = true;
            if (alert) {
                this.newAlertData = { ...alert };
            } else {
                this.newAlertData = {
                    description: '',
                    created_at: '',
                };
            }
        },
        closeModal() {
            this.showAlertModal = false;
            this.newAlertData = {
                description: '',
                created_at: '',
            };
        },
        saveAlert(alertData) {
            const alert = {
                ...alertData,
                created_at: alertData.created_at || new Date().toISOString()
            };

            if (alert.id) {
                api.put(`/alerts/${alert.id}`, alert)
                    .then((response) => {
                        const index = this.alerts.findIndex(a => a.id === alert.id);
                        if (index !== -1) {
                            this.alerts[index] = response.data;
                        }
                        this.closeModal();
                        this.loadAlerts();
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar o alerta:', error);
                    });
            } else {
                api.post('/alerts', alert)
                    .then((response) => {
                        this.alerts.push(response.data);
                        this.closeModal();
                        this.loadAlerts();
                    })
                    .catch((error) => {
                        console.error('Erro ao salvar o alerta:', error);
                    });
            }
        },
        loadAnimalData() {
            this.animal = {
                quality: 'Alta',
                coatColor: 'Amarela',
                colorStatus: 'Normal',
                length: 'Longo',
            };
        },
        loadAlerts() {
            api.get('api/alerts')
                .then((response) => {
                    this.alerts = response.data;
                })
                .catch((error) => {
                    console.error('Erro ao carregar alertas', error);
                });
        },
        toggleDetails(callId) {
            this.activeCall = this.activeCall === callId ? null : callId;
        },
    },
    mounted() {
        this.loadAnimalData();
        this.loadAlerts();
    },
};
</script>

<style scoped></style>
