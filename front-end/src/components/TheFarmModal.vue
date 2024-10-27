<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-[800px] p-6 relative">
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Cadastro - Fazenda</h1>
            <form @submit.prevent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="name" name="name" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="cnpj" class="block text-sm font-medium text-gray-700">CNPJ</label>
                        <input type="text" id="cnpj" name="cnpj" v-mask="'##.###.###/####-##'" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                        <input type="text" id="cep" name="cep" v-mask="'#####-###'" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">Endereço</label>
                        <input type="text" id="address" name="address" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="number_address" class="block text-sm font-medium text-gray-700">N°</label>
                        <input type="number" id="number_address" name="number_address" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="phone_number" class="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" id="phone_number" name="phone_number" v-mask="'(##) #####-####'" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <input type="checkbox" id="status" name="status" checked
                            class="mt-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    </div>
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Imagem</label>
                        <input type="file" id="image" name="image" accept="image/*"
                            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
                    </div>
                    <div>
                        <label for="created_at" class="block text-sm font-medium text-gray-700">Data Cadastro</label>
                        <input type="date" id="created_at" name="created_at" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="col-span-2">
                        <label for="obs" class="block text-sm font-medium text-gray-700">Observações</label>
                        <textarea id="obs" name="obs" rows="4"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit"
                        class="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 768px) {
    .modal_fazenda {
        padding: 1rem;
    }
}
</style>
