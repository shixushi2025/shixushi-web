import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './style.css'; // 全局样式与变量
import './assets/main.css'; // 其他样式

createApp(App).use(router).mount('#app');