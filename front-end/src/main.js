import './assets/main.css'
import VueTheMask from 'vue-the-mask';
import 'font-awesome/css/font-awesome.css';


import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/app.css'

const app = createApp(App);

app.use(router);
app.use(VueTheMask);
app.mount('#app');
