import 'jquery/dist/jquery.min.js'
import './main.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from "./router/index";
import App from './App.vue';

const app = createApp(App).use(createPinia()).use(router).mount('#app')

// import { useLoginStore } from './store/controllers/Login';
// router.beforeEach((to, from, next) => {
//     if ((to.name !== 'Login' && to.name !== 'Pass') && !useLoginStore().isAuhthenticated){
//         next({ name: 'Login' })
//         console.log('login');
//         useLoginStore().eraseSession();
//     } else {
//         console.log('continue');
//         next()
//     }
// })
