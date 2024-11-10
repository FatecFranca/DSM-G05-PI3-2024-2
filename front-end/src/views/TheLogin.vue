<template>
  <div class="flex">
    <div class="esquerda hidden lg:flex w-1/2 h-screen justify-center items-center">
      <img class="rounded-full" src="../assets/logo.jpg" alt="logo">
    </div>
    <div class="direita flex w-full lg:w-1/2 h-screen justify-center items-center">
      <transition name="component-fade" mode="out-in">
        <component :is="view" key="view">
          <div v-if="view === 'LoginForm'" class="login-form">
            <TheLoading :isLoading="isLoading" />
            <div v-if="!isLoading">
              <div>
                <h2 class="text-4xl font-bold">Login <span>AgroTech</span></h2>
              </div>
              <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
              <div class="text-[20px]">
                <h3>Email</h3>
                <input type="email" v-model="email" placeholder="pecuariapro@123.com" required
                  @keyup.enter="validarLogin" />
              </div>
              <div class="text-[20px]">
                <h3>Senha</h3>
                <input type="password" v-model="senha" placeholder="**********" required @keyup.enter="validarLogin" />
                <div class="esqueceu-senha">
                  <a href="#" @click="trocarParaRecuperarSenha">Esqueceu a senha?</a>
                </div>
              </div>
              <div class="mt-[10%] mb-[3%]">
                <button class="botao" @click="validarLogin">Login</button>
              </div>
              <div class="flex justify-around text-[20px]">
                <h4>Não tem conta? <a href="#" @click="trocarParaCriarConta">Criar Conta</a></h4>
              </div>
            </div>
          </div>

          <div v-else-if="view === 'CriarContaForm'" class="criar-conta-form">
            <div>
              <h2 class="mb-[10%] text-4xl font-bold">Conta <span>AgroTech</span></h2>
            </div>
            <div class="text-[20px]">
              <h3>Digite seu email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com" required />
            </div>
            <div class="senha text-[20px]">
              <h3>Digite uma senha</h3>
              <input type="password" v-model="senha" placeholder="**********" required />
            </div>
            <div class="senha text-[20px]">
              <h3>Confirme a senha</h3>
              <input type="password" v-model="confirmarSenha" placeholder="**********" required />
            </div>
            <div class="mt-[10%] mb-[3%]">
              <button class="botao" @click="cadastrarConta">Cadastrar</button>
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
              <h4>Esqueceu sua senha? Não se preocupe! <br> Insira o seu endereço de e-mail abaixo <br> e enviaremos um
                link para redefinir sua senha.</h4>
              <h3>Email</h3>
              <input type="email" v-model="email" placeholder="pecuariapro@123.com" required />
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
import axios from 'axios';
import { useRouter } from 'vue-router';
import TheLoading from '../components/TheLoading.vue';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default {
  name: 'TheLogin',
  components: {
    TheLoading
  },
  data() {
    return {
      email: "",
      senha: "",
      confirmarSenha: "",
      errorMessage: "",
      view: 'LoginForm',
      isLoading: false,
    };
  },

  setup() {
    const router = useRouter();
    return { router };
  },

  methods: {
    async validarLogin() {
      this.errorMessage = "";
      if (!this.email || !this.senha) {
        this.errorMessage = "Por favor, preencha todos os campos.";
        return;
      }

      this.isLoading = true;
      try {
        const response = await api.post(`/api/users/login`, {
          email: this.email,
          password: this.senha,
        });

        if (response.data.success) {
          this.router.push('/home');
        } else {
          this.errorMessage = "Email ou senha incorretos.";
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Erro ao tentar fazer login.";
      } finally {
        this.isLoading = false;
      }
    },

    async cadastrarConta() {
      this.errorMessage = "";
      if (!this.email || !this.senha || !this.confirmarSenha) {
        this.errorMessage = "Por favor, preencha todos os campos.";
        return;
      }

      if (this.senha !== this.confirmarSenha) {
        this.errorMessage = "As senhas não coincidem.";
        return;
      }

      this.isLoading = true;
      try {
        const response = await api.post(`/api/users/register`, {
          email: this.email,
          password: this.senha,
        });

        if (response.data.message === "Usuário criado com sucesso.") {
          this.router.push('/home');
        } else {
          this.errorMessage = response.data.message || "Erro ao criar conta.";
        }
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Erro ao tentar criar conta.";
      } finally {
        this.isLoading = false;
      }
    },

    enviarRecuperacao() { },

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
};
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

.error-message {
  color: red;
  font-size: 16px;
  margin-bottom: 10px;
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
}

.esqueceu-senha {
  margin-top: 10px;
  font-size: 14px;
}

@media (max-width: 640px) {
  .botao {
    width: 100%;
    font-size: 20px;
  }

  input[type="password"],
  input[type="email"] {
    width: 100%;
  }
}
</style>
