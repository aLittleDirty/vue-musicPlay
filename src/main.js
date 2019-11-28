import Vue from 'vue'
import App from './App.vue'
import './assets/style/global.scss'
import router from './router/routers.js'
import axios from "axios";
import store from './store/index.js'
axios.defaults.baseURL="http://localhost:3000";

// 创建Vue实例
new Vue({
    router,
    store,
    render:h => h(App)
}).$mount('#app');