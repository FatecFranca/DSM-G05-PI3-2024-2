<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
            <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold mb-4">{{ info.id ? 'Editar Informação' : 'Cadastrar Informação' }}</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-gray-700">Assunto</label>
                    <input v-model="info.subject" type="text" class="border rounded w-full px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Categoria</label>
                    <input v-model="info.category" type="text" class="border rounded w-full px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Descrição</label>
                    <textarea v-model="info.description" class="border rounded w-full px-3 py-2" required></textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700">Data</label>
                    <input v-model="info.created_at" type="date" class="border rounded w-full px-3 py-2" disabled />
                </div>

                <div class="flex justify-end">
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheInfoModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        info: {
            type: Object,
            default: () => ({
                subject: '',
                category: '',
                description: '',
                created_at: '',
            }),
        },
    },
    methods: {
        submitForm() {
            this.$emit('save-info', { ...this.info });
        },
    },
};
</script>

<style scoped>
.fixed {
    position: fixed;
}
</style>
