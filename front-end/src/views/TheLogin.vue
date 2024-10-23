<template>
  <div class="body">
    <div class="esquerda">
      <img class="img" src="../assets/logo.jpg" alt="logo">
    </div>
    <div class="direita">
      <transition name="component-fade" mode="out-in">
        <component :is="view" key="view">
          <div v-if="view === 'LoginForm'" class="login-form">
            <div class="nomeprincipal">
              <h2>Login <span>AgroTech</span></h2>
            </div>

            <div class="email">
              <h3>Email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com" class="input-email">
            </div>

            <div class="senha">
              <h3>Senha</h3>
              <input type="password" v-model="senha" placeholder="**********" class="input-senha">
              <a href="#" @click="trocarParaRecuperarSenha">Esqueceu a senha?</a>
            </div>

            <div class="botao">
              <button @click="validarLogin">Login</button>
            </div>

            <div class="criaConta">
              <h4>Não tem conta? <a href="#" @click="trocarParaCriarConta">Criar Conta</a></h4>
            </div>
          </div>

          <div v-else-if="view === 'CriarContaForm'" class="criar-conta-form">
            <div class="nomeprincipal">
              <h2>Conta <span>AgroTech</span></h2>
            </div>

            <div class="email">
              <h3>Digite seu email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com" class="input-email">
            </div>

            <div class="senha">
              <h3>Digite uma senha</h3>
              <input type="password" v-model="senha" placeholder="**********" class="input-senha">
            </div>

            <div class="senha">
              <h3>Confirme a senha</h3>
              <input type="password" placeholder="**********" class="input-senha">
            </div>

            <div class="botao">
              <button>Cadastrar</button>
            </div>

            <div class="criaConta">
              <h4>Já tem conta? <a href="#" @click="trocarParaLogin">Login Conta</a></h4>
            </div>
          </div>

          <div v-else-if="view === 'RecuperarSenhaForm'" class="recuperar-senha-form">
            <div class="nomeprincipal">
              <h2>Recuperar Senha <span>AgroTech</span></h2>
            </div>

            <div class="email">
              <h4>Esqueceu sua senha? Não se preocupe! <br> Insira o seu endereço de e-mail abaixo <br>e enviaremos um link para redefinir sua senha. </h4>
              <h3>Email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com" class="input-email">
            </div>
            
            <div class="botao">
              <button>Enviar</button>
            </div>

            <div class="criaConta">
              <h4><a href="#" @click="trocarParaLogin">Voltar para o Login</a></h4>
            </div>
          </div>

        </component>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TheLogin',
  data() {
    return {
      users: [],
      email: "",
      senha: "",
      error: null,
      view: 'LoginForm',  // Definindo qual formulário exibir
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users')
        this.users = response.data
        console.log(this.users)
      } catch (error) {
        this.error = error.response && error.response.data ? error.response.data.message : 'Erro ao buscar usuários.';
        console.error('Erro ao buscar usuários:', error);
      }
    },

    async validarLogin() {
      const usuarioEncontrado = this.users.find(user => user.email === this.email && user.password === this.senha);

      if (usuarioEncontrado) {
        console.log("Login bem-sucedido! Usuário:", usuarioEncontrado.name);
      } else {
        console.log("Email ou senha incorretos.");
      }
    },

    trocarParaCriarConta() {
      this.view = 'CriarContaForm';
    },

    trocarParaLogin() {
      this.view = 'LoginForm';
    },

    trocarParaRecuperarSenha() {
      this.view = 'RecuperarSenhaForm';
    }
  },
}
</script>

<style scoped>
/* Adicione seus estilos aqui */
</style>
