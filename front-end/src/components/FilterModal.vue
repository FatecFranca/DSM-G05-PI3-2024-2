<template>
  <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white w-[300px] md:w-[500px] p-6 rounded-lg shadow-lg relative">
      <h2 class="text-lg font-semibold mb-4">Filtros</h2>

      <!-- Opções de Filtros -->
      <div class="space-y-4">
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Tipo de Animal</label>
          <select id="type" v-model="filters.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
            <option value="">Selecione o Tipo</option>
            <option value="gado">Gado</option>
            <option value="ovelha">Ovelha</option>
            <option value="porco">Porco</option>
          </select>
        </div>

        <div>
          <label for="age" class="block text-sm font-medium text-gray-700">Idade</label>
          <select id="age" v-model="filters.age" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
            <option value="">Selecione a Idade</option>
            <option value="1-2">1-2 anos</option>
            <option value="3-4">3-4 anos</option>
            <option value="5+">5+ anos</option>
          </select>
        </div>

        <div>
          <label for="health" class="block text-sm font-medium text-gray-700">Estado de Saúde</label>
          <select id="health" v-model="filters.health" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
            <option value="">Selecione o Estado de Saúde</option>
            <option value="saudável">Saudável</option>
            <option value="doente">Doente</option>
          </select>
        </div>
      </div>

      <!-- Botões -->
      <div class="mt-6 flex justify-end gap-4">
        <button @click="clearFilters" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Limpar</button>
        <button @click="applyFilters" class="bg-green-600 text-white px-4 py-2 rounded-md">Aplicar</button>
      </div>

      <!-- Botão de Fechar -->
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
        <i class="fa fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterModal',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        type: '',
        age: '',
        health: '',
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    clearFilters() {
      this.filters = {
        type: '',
        age: '',
        health: '',
      };
    },
    applyFilters() {
      this.$emit('apply-filters', this.filters);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Estilo adicional para modal */
</style>
