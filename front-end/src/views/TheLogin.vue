<template>
  <div class="flex">
    <div class="esquerda hidden lg:flex w-1/2 h-screen justify-center items-center">
      <img class="rounded-full" src="../assets/logo.jpg" alt="logo">
    </div>
    <div class="direita flex w-full lg:w-1/2 h-screen justify-center items-center">
      <transition name="component-fade" mode="out-in">
        <component :is="view" key="view">
          <div v-if="view === 'LoginForm'" class="login-form">
            <div>
              <h2 class="text-4xl font-bold">Login <span>AgroTech</span></h2>
            </div>
            <div class="text-[20px]">
              <h3>Email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com">
            </div>
            <div class="text-[20px]">
              <h3>Senha</h3>
              <input type="password" v-model="senha" placeholder="**********">
              <a href="#" @click="trocarParaRecuperarSenha" class="esqueceu-senha">Esqueceu a senha?</a>
            </div>
            <div class="mt-[10%] mb-[3%]">
              <router-link to="/home">
                <button class="botao" @click="validarLogin">Login</button>
              </router-link>
            </div>
            <div class="flex justify-around text-[20px]">
              <h4>Não tem conta? <a href="#" @click="trocarParaCriarConta">Criar Conta</a></h4>
            </div>
          </div>
          <div v-else-if="view === 'CriarContaForm'" class="criar-conta-form">
            <div>
              <h2 class="mb-[10%] text-4xl font-bold">Conta <span>AgroTech</span></h2>
            </div>
            <div class="text-[20px]">
              <h3>Digite seu email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com">
            </div>
            <div class="senha text-[20px]">
              <h3>Digite uma senha</h3>
              <input type="password" v-model="senha" placeholder="**********">
            </div>
            <div class="senha text-[20px]">
              <h3>Confirme a senha</h3>
              <input type="password" placeholder="**********">
            </div>
            <div class="mt-[10%] mb-[3%]">
              <button class="botao">Cadastrar</button>
            </div>
            <div class="flex justify-around text-[20px]">
              <h4>Já tem conta? <a href="#" @click="trocarParaLogin">Login Conta</a></h4>
            </div>
          </div>
          <div v-else-if="view === 'RecuperarSenhaForm'" class="recuperar-senha-form">
            <div class="nomeprincipal">
              <h2 class="mb-[10%] text-4xl font-bold">Recuperar Senha <span>AgroTech</span></h2>
            </div>
            <div class="email">
              <h4>Esqueceu sua senha? Não se preocupe! <br> Insira o seu endereço de e-mail abaixo <br>e enviaremos um
                link para redefinir sua senha.</h4>
              <h3>Email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com">
            </div>
            <div class="mt-[10%] mb-[3%]">
              <button class="botao" @click="enviarRecuperacao">Enviar</button>
            </div>
            <div class="flex justify-around text-[20px]">
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
import { useRouter } from 'vue-router'

export default {
  name: 'TheLogin',
  data() {
    return {
      users: [],
      email: "",
      senha: "",
      error: null,
      view: 'LoginForm',
    }
  },

  setup() {
    const router = useRouter();
    return { router };
  },

  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/users')
        this.users = response.data
      } catch (error) {
        this.error = error.response && error.response.data ? error.response.data.message : 'Erro ao buscar usuários.';
      }
    },

    async validarLogin() {
      const usuarioEncontrado = this.users.find(user => user.email === this.email && user.password === this.senha);
      if (usuarioEncontrado) {
        this.router.push('/home');
      } else {
        console.log("Email ou senha incorretos.");
      }
    },

    async enviarRecuperacao() {
      console.log("Link de recuperação enviado para:", this.email);
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
.esquerda {
  background-color: #ccde8d;
}

h2 span {
  color: #60b665;
  font-weight: bold;
}

.nomeprincipal {
  margin-bottom: 10%;
}

h3 {
  margin-bottom: 5%;
  margin-top: 5%;
  font-weight: bold;
}

.botao {
  background-color: #4aad52;
  color: white;
  font-weight: bold;
  width: 532px;
  height: 81px;
  font-size: 30px;
  border-radius: 12px;
  border: none;
  transition: background-color 0.3s, transform 0.1s;
}

input[type="password"],
input[type="email"] {
  background-color: #FFFFFF;
  border: 2px solid #818181;
  border-radius: 12px;
  padding-left: 50px;
  height: 81px;
  width: 532px;
  font-size: 20px;
  font-weight: bold;
  transition: border-color 0.3s;
  background-image: none;
}

input[type="password"] {
  background-image: url("../assets/imgs/senha.png");
  background-position: 10px center;
  background-repeat: no-repeat;
  background-size: 34px 34px;
}

input[type="email"] {
  background-image: url("../assets/imgs/email.png");
  background-position: 10px center;
  background-repeat: no-repeat;
  background-size: 34px 34px;
}

input[type="password"]:focus,
input[type="email"]:focus {
  border-color: #60b665;
  outline: none;
}

@media (max-width: 1120px) {
  .esquerda {
    display: none;
  }

  .direita {
    justify-content: center;
  }
}

@media (max-width: 640px) {

  input[type="password"],
  input[type="email"] {
    width: 400px;
  }
}

@media (min-width: 640px) and (max-width: 768px) {

  input[type="password"],
  input[type="email"] {
    width: 450px;
  }
}

@media (min-width: 768px) {

  input[type="password"],
  input[type="email"] {
    width: 532px;
  }
}

.botao:hover {
  background-color: #3ce044;
}

.botao:active {
  box-shadow: inset 0px 0.1em 0.6em #3ce044;
  transform: translateY(0.1em);
}

.email h4 {
  text-align: justify;
  font-size: 16px;
  font-weight: bold;
}

.esqueceu-senha {
  display: block;
  margin-top: 5px;
  color: #60712f;
  text-align: right;
  width: 100%;
}

a {
  color: #60712f;
  text-decoration: none;
}
</style>
