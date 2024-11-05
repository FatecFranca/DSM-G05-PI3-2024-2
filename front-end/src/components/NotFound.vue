<template>
    <div class="not-found">
        <h1>404 - Página Não Encontrada</h1>
        <p>Desculpe, a página que você está procurando não existe.</p>
        <router-link to="/">Voltar para a Página Inicial</router-link>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
};
</script>

<style scoped>
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 3em;
    color: #f44336;
    /* Cor vermelha para destacar */
}

.not-found p {
    font-size: 1.2em;
}
</style>
