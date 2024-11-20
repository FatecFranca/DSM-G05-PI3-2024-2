<template>
  <div>
    <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg w-full max-w-5xl relative h-[90%]">
        <span class="absolute top-4 right-4 text-3xl text-gray-600 cursor-pointer hover:text-red-600"
          @click="closeModal">&times;</span>

        <h1 class="text-center text-2xl font-semibold text-gray-800">
          {{ isEditMode ? "Editar Animal" : "Cadastro - Animal" }}
        </h1>
        <div class="w-1/5 h-[1px] bg-gray-800 mx-auto my-2"></div>

        <div class="flex flex-col md:flex-row gap-5 mt-4">
          <div class="w-full md:w-1/2 space-y-3">
            <div>
              <label for="name" class="block font-semibold">Nome</label>
              <input type="text" id="name" v-model="animal.name_animal" required
                class="w-full p-0.5 border rounded-lg" />
            </div>
            <div>
              <label for="sexo" class="block font-semibold">Sexo</label>
              <select id="sexo" v-model="animal.gender" required class="w-full p-0.5 border rounded-lg">
                <option value="">Selecione</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>
            <div>
              <label for="raca" class="block font-semibold">Raça</label>
              <input type="text" id="raca" v-model="animal.animal_breed" required
                class="w-full p-0.5 border rounded-lg" />
            </div>
            <label class="font-semibold">Status</label>
            <div class="flex">
              <button :class="{ 'bg-green-300': animal.status === 'vivo', 'bg-white': animal.status !== 'vivo' }"
                class="w-24 p-0.5 border border-gray-300 rounded-l-lg hover:bg-gray-200"
                @click="toggleStatus('vivo')">Vivo</button>
              <button :class="{ 'bg-red-300': animal.status === 'obito', 'bg-white': animal.status !== 'obito' }"
                class="w-24 p-0.5 border border-gray-300 rounded-r-lg hover:bg-gray-200"
                @click="toggleStatus('obito')">Óbito</button>
            </div>
          </div>

          <div class="w-full md:w-1/2 space-y-3">
            <div>
              <label for="chip" class="block font-semibold">Nº do chip</label>
              <input type="text" id="chip" v-model="animal.earring" required class="w-full p-0.5 border rounded-lg" />
            </div>
            <div>
              <label for="imagem" class="block font-semibold">Imagem</label>
              <input type="file" id="imagem"
                class="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
              file:rounded-lg-full file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-blue-800 hover:file:bg-blue-300"
                @change="handleImageUpload" />
            </div>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button
            class="bg-teal-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-700 transform hover:scale-105"
            @click="saveAnimal">{{ isEditMode ? "SALVAR ALTERAÇÕES" : "REGISTRAR" }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    animalData: {
      type: Object,
      default: () => ({}),
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      animal: {
        name_animal: "",
        gender: "",
        animal_breed: "",
        status_active: null,
        earring: "",
        img_animal: null,
        ...this.animalData,
      },
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    toggleStatus(status) {
      this.animal.status_active = this.animal.status_active === status ? null : status;
    },
    handleImageUpload(event) {
      this.animal.image = event.target.files[0];
    },
    saveAnimal() {
      this.$emit("save", this.animal);
      this.closeModal();
    },
  },
};
</script>
