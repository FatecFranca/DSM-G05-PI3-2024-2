<template>
    <div class="overlay">
        <div class="modal_fazenda">
            <button @click="$emit('close')">Fechar</button> <!-- Botão para fechar -->
            <h1>Cadastro - Fazenda</h1>
            <form action="" method="post">
                <div>
                    <label for="name">Nome</label>
                    <input type="text" name="name" id="name">
                    <label for="cnpj">CNPJ</label>
                    <input type="text" name="cnpj" id="cnpj" v-mask="'##.###.###/####-##'">
                    <label for="cep">CEP</label>
                    <input type="text" name="cep" id="cep" v-mask="'#####-###'">
                    <label for="address">Endereço</label>
                    <input type="text" name="address" id="address">
                    <label for="number_address">N°</label>
                    <input type="number" name="number_address" id="number_address">
                </div>
                <div>
                    <label for="phone_number">Telefone</label>
                    <input type="tel" name="phone_number" id="phone_number" v-mask="'(##) #####-####'">
                    <input type="checkbox" name="status" id="status" checked>
                    <label for="status">Status</label>
                    <label for="image">Imagem</label>
                    <input type="file" name="image" id="image">
                    <label for="created_at">Data Cadastro</label>
                    <input type="date" name="created_at" id="created_at">
                    <label for="obs">Observações</label>
                    <textarea name="obs" id="obs" cols="30" rows="10"></textarea>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal_fazenda {
    background-color: rgb(255, 0, 0);
    height: 50vh;
    width: 90vh;
    display: flex;
    flex-direction: column;
    padding: 20px;
}
</style>
