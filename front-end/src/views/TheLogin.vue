<template>
  <section>
    <h1>Lista de Usuários</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
      <li v-for="user in users" :key="user.id">{{ user.email }}</li>
      <li v-for="user in users" :key="user.id">Usuário: {{ user.master ? "ADM" : "COMUM" }}</li>
    </ul>
    <div v-if="error" class="error">{{ error }}</div><br>
    <hr><br>
    <div>
      <label for="email">Email</label><br>
      <input type="text" v-model="email" name="email" id="email"><br>
      <label for="password">Senha</label><br>
      <input type="password" v-model="senha" name="password" id="password">
      <button @click="validarLogin">Login</button><br>
      {{ email }}
      {{ senha }}
    </div>
  </section>
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
    }
  },
}
</script>

<style scoped>

</style>
