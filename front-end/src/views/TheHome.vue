<template>
  <div class="w-screen h-screen flex">
    <TheSidebar :isSidebarVisible="isSidebarVisible" @toggle-sidebar="toggleSidebar" />

    <!-- Main -->
    <div class="flex-1 h-full bg-gray-400">
      <div class="flex items-center h-[85px] bg-red-50 relative">
        <i class="fa fa-bars fa-2x cursor-pointer p-2" aria-hidden="true" @click="toggleSidebar"></i>
        <span class="mt-[25px] mb-[35px] text-4xl font-bold absolute left-1/2 transform -translate-x-1/2">
          {{ nomeFazenda }}
        </span>
      </div>

      <!-- Main Content Area -->
      <div class="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">
        <div class="flex justify-between items-center bg-white border-l-4 border-blue-500 rounded-lg shadow p-4">
          <div>
            <p>Total (Diário)</p>
            <p>120 LITROS</p>
            <p>N° Animais: 18</p>
          </div>
          <div class="text-3xl text-gray-700 mr-[25px]">
            <i class="fa fa-bitbucket" aria-hidden="true"></i>
          </div>
        </div>
        <div class="flex justify-between items-center bg-white border-l-4 border-green-500 rounded-lg shadow p-4">
          <div>
            <p>Média (Diária)</p>
            <p>20 LITROS</p>
            <p>N° Animais: 18</p>
          </div>
          <div class="text-3xl text-gray-700 mr-[25px]">
            <i class="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
        </div>
        <div class="flex justify-between items-center bg-white border-l-4 border-red-500 rounded-lg shadow p-4">
          <div>
            <p>Total (Mensal)</p>
            <p>3.600 LITROS</p>
            <p>N° Ordenhas: 18</p>
          </div>
          <div class="text-3xl text-gray-700 mr-[25px]">
            <i class="fa fa-bitbucket" aria-hidden="true"></i>
          </div>
        </div>
        <div class="flex justify-between items-center bg-white border-l-4 border-yellow-500 rounded-lg shadow p-4">
          <div>
            <p>Média (Mensal)</p>
            <p>10 LITROS</p>
            <p>Média por Animal</p>
          </div>
          <div class="text-3xl text-gray-700 mr-[25px]">
            <i class="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
        </div>
        <div
          class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-between items-center bg-white border-l-4 border-yellow-500 rounded-lg shadow p-4">
          <div class="w-[8%]">
            <p>Projeção Mensal</p>
            <p>10 LITROS</p>
            <p>Litros: 72</p>
          </div>
          <input type="range" min="0" max="100" v-model="rangeValue" :style="{ background: getColor(rangeValue) }"
            class="w-full h-2 mx-4 rounded-lg appearance-none focus:outline-none" />
          <div class="text-3xl text-gray-700 mr-[25px]">
            <i class="fa fa-bar-chart" aria-hidden="true"></i>
          </div>
        </div>
        <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-10 gap-7">
          <div class="col-span-6 bg-white rounded-lg shadow">
            <div class="pb-4">
              <p class="font-bold text-xl bg-gray-300 rounded-t-lg p-4">Acompanhamento (Diário)</p>
              <div class="p-4">
                <p><strong>Total de Animais:</strong> 50</p>
                <p><strong>Bezerros (0-6 meses):</strong> 10</p>
                <p><strong>Novilhas (6-24 meses):</strong> 15</p>
                <p><strong>Vacas Adultas:</strong> 25</p>
                <p><strong>Produção de Leite:</strong> A produção média por vaca é de <strong>20 LITROS</strong>. Hoje,
                  foram produzidos um total de <strong>360 LITROS</strong>.</p>
                <p><strong>Comportamento:</strong> 5 animais estão agitados, necessitando de observação.</p>
                <p><strong>Nascimentos e Perdas:</strong> Esta semana, nasceram 2 bezerros e houve 1 perda.</p>
              </div>
            </div>
          </div>
          <div class="col-span-4 bg-white rounded-lg shadow">
            <div class="pb-4">
              <p class="font-bold text-xl bg-gray-300 rounded-t-lg p-4">Informativos</p>
              <ul class="ml-6 list-disc space-y-2">
                <div class="ml-4 mt-4">
                  <li>Produção média por animal: 6 LITROS</li>
                  <li>Custo médio: R$ 0,80 por litro</li>
                  <li>Animais em tratamento: 2</li>
                  <li>Temperatura média: 22°C, Humidade: 65%</li>
                  <li>Ração fornecida: 200 kg de ração balanceada</li>
                  <li>Previsão de produção: 360 LITROS nos próximos 3 dias</li>
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 grid grid-cols-10 gap-7">
          <div class="col-span-10 bg-white rounded-lg shadow">
            <div class="pb-4">
              <p class="font-bold text-xl bg-gray-300 rounded-t-lg p-4">Crescimento da Fazenda (Mensal)</p>
              <p class="pl-4 pt-4">TERMINAR AQUI COM O GRAFICO, PESQUISAR FORMAS DE ADD GRAFICOS AQUI</p>
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
  name: 'TheHome',
  components: {
    TheSidebar,
  },
  data() {
    return {
      isSidebarVisible: false,
      nomeFazenda: "Fazenda Marechal",
      rangeValue: 30,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    getColor(value) {
      const red = Math.max(0, (100 - value) * 2.55);
      const green = Math.min(value * 2.55, 255);
      return `rgb(${red}, ${green}, 0)`;
    },
  },
};
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #333;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #333;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>
