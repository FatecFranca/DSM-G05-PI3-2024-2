<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded shadow-lg w-96">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Anotar Alerta</h2>
                <button @click="$emit('close')" class="text-gray-500 hover:text-gray-800">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-gray-700">Alerta</label>
                    <textarea v-model="alertData.description" class="border rounded w-full px-3 py-2"
                        placeholder="Escreva o alerta aqui..." required></textarea>
                </div>
                <div class="flex justify-end">
                    <button type="submit"
                        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Salvar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheModalAlert',
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
        alert: {
            type: Object,
            default: () => ({
                description: ''
            }),
        },
    },
    data() {
        return {
            alertData: { ...this.alert },
        };
    },
    watch: {
        alert: {
            immediate: true,
            handler(newAlert) {
                this.alertData = { ...newAlert };
            },
        },
    },
    methods: {
        submitForm() {
            this.$emit('save-alert', this.alertData);
            this.alertData = { description: '' };
        },
    },
};
</script>

<style scoped>
.fixed {
    position: fixed;
}
</style>
