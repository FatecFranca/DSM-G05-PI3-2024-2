<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

    <div class="flex-1 h-full bg-gray-100 overflow-auto">
      <div class="flex items-center h-[85px] bg-red-50 relative">
        <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
        <span class="mt-[25px] mb-[35px] text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
          {{ nomeFazenda }}
        </span>
      </div>

      <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div class="flex flex-col justify-between bg-white border-l-4 border-blue-500 rounded-lg shadow p-4">
          <p class="font-bold text-lg">Produção Diária</p>
          <p>Total: 120 Litros</p>
          <p>Média por Animal: 6 Litros</p>
          <p>Número de Animais: 18</p>
        </div>

        <div class="flex flex-col justify-between bg-white border-l-4 border-green-500 rounded-lg shadow p-4">
          <p class="font-bold text-lg">Produção Mensal</p>
          <p>Total: 3600 Litros</p>
          <p>Média por Animal: 10 Litros</p>
          <p>Ordenhas Realizadas: 18</p>
        </div>

        <!-- Meta de Produção Mensal com Barra de Progresso Estilizada -->
        <div class="flex flex-col bg-white border-l-4 border-yellow-500 rounded-lg shadow p-4">
          <p class="font-bold text-lg">Meta de Produção Mensal</p>
          <p>Meta: 3200 Litros</p>
          <p>Progresso Atual: {{ totalProducao }} / 3200 Litros</p>
          <div class="w-full bg-gray-300 rounded-lg h-4 mt-2 overflow-hidden">
            <div class="h-full bg-green-500" :style="{ width: progressoMeta + '%' }">
            </div>
          </div>
        </div>

        <div class="flex flex-col bg-white border-l-4 border-red-500 rounded-lg shadow p-4">
          <p class="font-bold text-lg">Status dos Animais</p>
          <p>Total de Animais: 50</p>
          <p>Em Tratamento: 2</p>
          <p>Agitados: 5 (observação necessária)</p>
        </div>
      </div>

      <div class="p-4 grid grid-cols-1 gap-6">
        <div class="bg-white rounded-lg shadow p-4">
          <p class="font-bold text-lg">Tendência de Produção</p>
          <div class="chart-container">
            <canvas id="tendenciaProducao" style="width: 100%; height: 400px;"></canvas>
          </div>
        </div>
      </div>

      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-4">
          <p class="font-bold text-lg">Informativos Gerais</p>
          <ul class="list-disc ml-4 mt-2 space-y-2">
            <li>Produção média por animal: 6 Litros</li>
            <li>Custo médio: R$ 0,80 por litro</li>
            <li>Temperatura média: 22°C, Humidade: 65%</li>
            <li>Ração fornecida: 200 kg de ração balanceada</li>
            <li>Previsão de produção: 360 Litros nos próximos 3 dias</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <p class="font-bold text-lg">Alertas e Notificações</p>
          <ul class="list-disc ml-4 mt-2 space-y-2">
            <li>Produção diária abaixo do esperado.</li>
            <li>5 animais agitados, requerem atenção.</li>
            <li>Meta de produção mensal a 75% do objetivo.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSidebar from '../components/TheSidebar.vue';
import { Chart } from 'chart.js/auto';

export default {
  name: 'TheHome',
  components: {
    TheSidebar,
  },
  data() {
    return {
      isSidebarVisible: false,
      nomeFazenda: 'Fazenda Marechal',
      totalProducao: 2400,
      chart: null,
    };
  },
  computed: {
    progressoMeta() {
      return (this.totalProducao / 3200) * 100;
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    createChart() {
      const data = [
        { day: '01/10', count: 120 },
        { day: '02/10', count: 115 },
        { day: '03/10', count: 130 },
        { day: '04/10', count: 125 },
        { day: '05/10', count: 110 },
        { day: '06/10', count: 140 },
      ];

      this.chart = new Chart(
        document.getElementById('tendenciaProducao'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.day),
            datasets: [
              {
                label: 'Produção Diária (Litros)',
                data: data.map(row => row.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Litros Produzidos',
                },
              },
            },
          },
        }
      );
    },
  },
  mounted() {
    this.createChart();
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.bg-green-500 {
  background-color: #48bb78;
}
</style>
