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
            <form @submit.prevent="saveData" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="fantasy_name" class="block text-sm font-medium text-gray-700">Nome Fantasia
                            *</label>
                        <input type="text" id="fantasy_name" v-model="formData.fantasy_name" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="social_reason" class="block text-sm font-medium text-gray-700">Razão Social</label>
                        <input type="text" id="social_reason" v-model="formData.social_reason"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="cnpj" class="block text-sm font-medium text-gray-700">CNPJ *</label>
                        <input type="text" id="cnpj" v-model="formData.cnpj" v-mask="'##.###.###/####-##'" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="registration_date" class="block text-sm font-medium text-gray-700">Data de
                            Registro</label>
                        <input type="date" id="registration_date" v-model="formattedRegistrationDate"
                            @blur="updateRegistrationDate"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="num_animals" class="block text-sm font-medium text-gray-700">Número de
                            Animais</label>
                        <input type="number" id="num_animals" v-model="formData.num_animals"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="cep" class="block text-sm font-medium text-gray-700">CEP</label>
                        <input type="text" id="cep" v-model="formData.cep" v-mask="'#####-###'"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="address" class="block text-sm font-medium text-gray-700">Endereço *</label>
                        <input type="text" id="address" v-model="formData.address" required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="number_address" class="block text-sm font-medium text-gray-700">Número</label>
                        <input type="text" id="number_address" v-model="formData.number_address"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label for="phone_number" class="block text-sm font-medium text-gray-700">Telefone *</label>
                        <input type="tel" id="phone_number" v-model="formData.phone_number" v-mask="'(##) #####-####'"
                            required
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="flex items-center space-x-2">
                        <label for="status_active" class="block text-sm font-medium text-gray-700">Status</label>
                        <input type="checkbox" id="status_active" v-model="formData.status_active"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span class="text-sm text-gray-700">{{ formData.status_active ? 'Ativo' : 'Inativo' }}</span>
                    </div>
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">Imagem</label>
                        <input type="file" id="image" @change="handleImageUpload" accept="image/*"
                            class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200" />
                    </div>
                    <div>
                        <label for="created_at" class="block text-sm font-medium text-gray-700">Data Cadastro</label>
                        <input type="text" id="created_at" v-model="formattedCreatedAt" disabled
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div class="col-span-2">
                        <label for="obs" class="block text-sm font-medium text-gray-700">Observações</label>
                        <textarea id="obs" v-model="formData.obs" rows="4"
                            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                    </div>
                </div>
                <div class="flex justify-end mt-4">
                    <button type="submit"
                        class="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        fazenda: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            formData: {
                ...this.fazenda,
                created_at: this.fazenda.created_at || ''
            }
        };
    },
    computed: {
        formattedCreatedAt: {
            get() {
                if (!this.formData.created_at) return '';
                const date = new Date(this.formData.created_at);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
            set(value) {
                return value;
            }
        },
        formattedRegistrationDate: {
            get() {
                if (!this.formData.registration_date) return '';
                return this.formData.registration_date.split('T')[0];
            },
            set(value) {
                this.formData.registration_date = value;
            }
        }
    },
    watch: {
        fazenda: {
            immediate: true,
            handler(newData) {
                this.formData = {
                    ...newData,
                    created_at: newData.created_at || ''
                };
            }
        }
    },
    methods: {
        saveData() {
            this.$emit('save', this.formData);
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.image = file;
            }
        },
        updateRegistrationDate() {
            this.formData.registration_date = this.formattedRegistrationDate;
        }
    }
};
</script>

<style scoped></style>
