<template>
    <div class="w-screen h-screen flex">
        <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />
        <div class="flex-1 h-full bg-gray-100 flex flex-col">
            <div class="flex items-center h-20 bg-white shadow relative">
                <i class="fa fa-bars fa-lg cursor-pointer p-4" @click="toggleSidebar"></i>
                <span class="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">
                    ANIMAIS - VA-1629
                </span>
            </div>

            <div class="flex-1 flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div class="w-full lg:w-1/3 bg-green-50 rounded-lg shadow-md p-4">
                    <img src="../assets/imgs/cow.jpg" alt="Animal Image"
                        class="w-full h-56 object-cover rounded-md mb-4">
                    <div>
                        <h2 class="text-xl font-bold mb-2">VA-1629</h2>
                        <p>Qualidade do Produto: ALTA</p>
                        <ul class="mt-4 space-y-2">
                            <li>Cor do pelo: Malhado</li>
                            <li>Status de Coloração: Adequado</li>
                            <li>Comprimento do bovino: 1 Metro e 17 Centímetros</li>
                            <li>Condição da Terra: Excelente</li>
                            <li>Número de Pragas: Nenhuma</li>
                            <li>Status de Hidratação: Adequado</li>
                            <li>Saúde do Bovino: Boa</li>
                        </ul>
                        <p class="mt-4 text-gray-500 text-sm">Atualizado dia: 17 de Agosto, 2024</p>
                    </div>
                </div>

                <div class="flex-1 bg-white rounded-lg shadow-md p-4">
                    <h3 class="text-xl font-semibold mb-4">Crescimento do Animal</h3>
                    <div>
                        <div class="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
                            <p>Gráfico de crescimento (placeholder)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-1 flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
                <div class="w-full lg:w-1/2 bg-yellow-50 rounded-lg shadow-md p-4">
                    <h3 class="text-xl font-semibold mb-4">ALERTAS</h3>
                    <div class="space-y-2">
                        <div v-for="alert in alerts" :key="alert.id" class="bg-yellow-100 p-2 rounded-md">
                            <p>{{ alert.message }}</p>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-4">
                    <h3 class="text-xl font-semibold mb-4">HISTÓRICO</h3>
                    <div class="space-y-2">
                        <div v-for="entry in history" :key="entry.id" class="bg-gray-50 p-2 rounded-md">
                            <p><strong>{{ entry.date }}:</strong> {{ entry.subject }}</p>
                            <p>{{ entry.details }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';

export default {
    name: 'AnimalDetails',
    components: {
        TheSidebar,
    },
    data() {
        return {
            isSidebarVisible: false,
            alerts: [
                { id: 1, message: 'Vaca amarela pulou a janela e quebrou a canela, agora a mãe dela vai bater nela.' },
                { id: 2, message: 'Vaca amarela pulou a janela e quebrou a canela, agora a mãe dela vai bater nela.' },
            ],
            history: [
                { id: 1, date: '29/09/2024 22:30', subject: 'Vaca pulou a janela', details: 'Vaca amarela pulou a janela e quebrou a canela, agora a mãe dela vai bater nela.' },
                { id: 2, date: '02/10/2024 12:27', subject: 'Vaca pulou a janela', details: 'Vaca amarela pulou a janela e quebrou a canela, agora a mãe dela vai bater nela.' },
            ]
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible;
        }
    },
};
</script>

<style scoped>
.bg-green-50 {
    background-color: #f0fdf4;
}

.bg-yellow-50 {
    background-color: #fffbeb;
}
</style>
