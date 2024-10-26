<template>
    <div class="container_fazenda">
        <h1>Bem-vindo à Tela Fazenda!</h1>
        <button @click="cadastrarFazenda">{{ mostrar ? 'Ocultar Cadastro' : 'Mostrar Cadastro' }}</button>
        <TheFarmModal v-if="mostrar" @close="mostrar = false" />
    </div>
</template>

<script>
import TheFarmModal from '@/components/TheFarmModal.vue';
export default {
    name: 'TheFarm',
    components: {
        TheFarmModal,
    },
    data() {
        return {
            mostrar: false
        }
    },
    methods: {
        cadastrarFazenda() {
            this.mostrar = !this.mostrar;
        }
    }
};
</script>

<style scoped>
.container_fazenda {
    background-color: rgba(0, 0, 255, 0.477);
    width: 100vw;
    height: 100vh;
}
</style>
