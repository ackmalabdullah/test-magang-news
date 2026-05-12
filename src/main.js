import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/global.css';
import './assets/styles/variables.css';
import './assets/styles/responsive.css';

createApp(App).use(router).mount('#app');
