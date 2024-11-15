<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-[800px] p-6 relative">
            <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Cadastro - Usuário</h1>
            <form @submit.prevent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nome *</label>
                        <input type="text" id="name" v-model="usuario.name" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="ocupation" class="block text-sm font-medium text-gray-700">Cargo *</label>
                        <input type="text" id="ocupation" v-model="usuario.ocupation" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                        <input type="text" id="cep" v-model="usuario.cep" v-mask="'#####-###'"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">Endereço *</label>
                        <input type="text" id="address" v-model="usuario.address" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="number_address" class="block text-sm font-medium text-gray-700">N°</label>
                        <input type="number" id="number_address" v-model="usuario.number_address" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="phone_number" class="block text-sm font-medium text-gray-700">Celular *</label>
                        <input type="tel" id="phone_number" v-model="usuario.phone_number" v-mask="'(##) #####-####'"
                            required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="flex items-center space-x-2">
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <input type="checkbox" id="status" v-model="usuario.status_active"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span class="text-sm text-gray-700">{{ usuario.status_active ? 'Ativo' : 'Inativo' }}</span>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nível de Permissão</label>
                        <div class="flex space-x-4">
                            <label class="flex items-center space-x-2">
                                <input type="radio" name="permission_level" value="Admin"
                                    v-model="usuario.permissionLevel" class="hidden" />
                                <span
                                    :class="usuario.permissionLevel === 'Admin' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="px-3 py-1 rounded-full cursor-pointer">Admin</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="radio" name="permission_level" value="Master"
                                    v-model="usuario.permissionLevel" class="hidden" />
                                <span
                                    :class="usuario.permissionLevel === 'Master' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="px-3 py-1 rounded-full cursor-pointer">Master</span>
                            </label>
                            <label class="flex items-center space-x-2">
                                <input type="radio" name="permission_level" value="Observer"
                                    v-model="usuario.permissionLevel" class="hidden" />
                                <span
                                    :class="usuario.permissionLevel === 'Observer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                                    class="px-3 py-1 rounded-full cursor-pointer">Observer</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label for="created_at" class="block text-sm font-medium text-gray-700">Data Cadastro</label>
                        <input type="date" id="created_at" v-model="usuario.created_at" required disabled
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="col-span-2">
                        <label for="obs" class="block text-sm font-medium text-gray-700">Observações</label>
                        <textarea id="obs" v-model="usuario.obs" rows="4"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit"
                        class="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors">
                        {{ usuario.id ? 'Salvar Alterações' : 'Cadastrar' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        usuario: {
            type: Object,
            default: () => ({
                name: '',
                ocupation: '',
                cep: '',
                address: '',
                number_address: '',
                phone_number: '',
                status_active: false,
                permissionLevel: 'Admin',
                created_at: '',
                obs: '',
            }),
        },
    },
    data() {
        return {
            isActive: this.usuario.status_active,
            permissionLevel: this.usuario.permissionLevel,
        };
    },
    watch: {
        usuario: {
            handler(newValue) {
                if (newValue) {
                    this.isActive = newValue.status_active;
                    this.permissionLevel = newValue.permissionLevel;
                }
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
@media (max-width: 768px) {
    .modal_fazenda {
        padding: 1rem;
    }
}
</style>
