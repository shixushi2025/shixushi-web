import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css'; // 自己的样式

createApp(App).use(router).mount('#app');