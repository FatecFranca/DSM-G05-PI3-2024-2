<template>
  <div>
    <!-- Botão para abrir o modal -->
    <button class="open-modal-btn bg-green-600 text-white font-normal py-2 px-4 rounded mt-1 ml-5 hover:bg-green-700" @click="openModal">
    + Cadastrar Animal
    </button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div class="bg-[#eaf7e2] p-8 rounded-lg w-full max-w-5xl relative"> 
        <!-- Botão de fechar -->
        <span class="absolute top-4 right-4 text-3xl text-gray-600 cursor-pointer hover:text-red-600" @click="closeModal">&times;</span>

        <!-- Título -->
        <h1 class="text-center text-2xl font-semibold text-gray-800">Cadastro - Animal</h1>
        <div class="w-1/5 h-[1px] bg-gray-800 mx-auto my-2"></div> 

        <!-- Contêiner principal -->
        <div class="flex flex-col md:flex-row gap-5 mt-4">
          
          <!-- Coluna esquerda -->
          <div class="w-full md:w-1/2 space-y-3">
            <div>
              <label for="name" class="block font-semibold">Nome</label>
              <input type="text" id="name" v-model="animal.name" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="sexo" class="block font-semibold">Sexo</label>
              <select id="sexo" v-model="animal.sexo" required class="w-full p-2 border rounded">
                <option value="">Selecione</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>
            </div>
            <div>
              <label for="raca" class="block font-semibold">Raça</label>
              <input type="text" id="raca" v-model="animal.raca" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="pelagem" class="block font-semibold">Pelagem</label>
              <input type="text" id="pelagem" v-model="animal.pelagem" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="especie" class="block font-semibold">Espécie</label>
              <input type="text" id="especie" v-model="animal.especie" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="lote" class="block font-semibold">Lote</label>
              <input type="text" id="lote" v-model="animal.lote" required class="w-full p-2 border rounded"/>
            </div>
            <label class="font-semibold">Status</label>
            <div class="flex">
              <button
                :class="{'bg-green-300': animal.status === 'vivo', 'bg-white': animal.status !== 'vivo'}"
                class="w-24 p-2 border border-gray-300 rounded-l-lg hover:bg-gray-200 -mt-1 -mb-1"
                @click="toggleStatus('vivo')">Vivo</button>
              <button
                :class="{'bg-red-300': animal.status === 'obito', 'bg-white': animal.status !== 'obito'}"
                class="w-24 p-2 border border-gray-300 rounded-r-lg hover:bg-gray-200 -mt-1 -mb-1"
                @click="toggleStatus('obito')">Óbito</button>
            </div>
          </div>

          <!-- Coluna direita -->
          <div class="w-full md:w-1/2 space-y-3">
            <div>
              <label for="chip" class="block font-semibold">Nº do chip</label>
              <input type="text" id="chip" v-model="animal.chip" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="dataNascimento" class="block font-semibold">Data de Nascimento</label>
              <input type="date" id="dataNascimento" v-model="animal.dataNascimento" required class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="dataParto" class="block font-semibold -mt-1">Data do Último Parto</label>
              <input type="date" id="dataParto" v-model="animal.dataParto" class="w-full p-2 border rounded"/>
            </div>
            <div>
              <label for="peso" class="block font-semibold">Peso</label>
              <input type="text" id="peso" v-model="animal.peso" required class="w-full p-2 border rounded -mt-0 "/>
            </div>
            <div>
              <label for="imagem" class="block font-semibold">Imagem</label>
              <input type="file" id="imagem" class="mt-1" @change="handleImageUpload" />
            </div>
          </div>
        </div>

        <!-- Campo de informações -->
        <div class="mt-4">
          <label for="observacoes" class="block font-semibold">Observações</label>
          <textarea id="observacoes" v-model="animal.observacoes" placeholder="Digite informações adicionais sobre o animal..." class="w-full p-2 border rounded h-32"></textarea>
        </div>

        <div class="flex justify-end mt-4">
          <button class="bg-yellow-500 text-white font-bold py-2 px-6 rounded hover:bg-yellow-600 transform hover:scale-105" @click="registerAnimal">REGISTRAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheAnimalModal",
  data() {
    return {
      isModalOpen: false,
      animal: {
        name: "",
        sexo: "",
        raca: "",
        pelagem: "",
        especie: "",
        lote: "",
        status: null,
        chip: "",
        dataNascimento: "",
        dataParto: "",
        peso: "",
        informacoes: "",
        imagem: null,
      },
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleStatus(status) {
      this.animal.status = this.animal.status === status ? null : status;
    },
    handleImageUpload(event) {
      this.animal.imagem = event.target.files[0];
    },
    registerAnimal() {
      console.log("Animal registrado:", this.animal);
      this.closeModal();
    },
  },
};
</script>
