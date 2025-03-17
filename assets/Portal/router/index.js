import { createRouter, createMemoryHistory } from 'vue-router'

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Pass from '../views/Pass.vue';
import Users from '../views/Users.vue';
import Profile from '../views/Profile.vue';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: '/', name: "Login", component: Login },
        { path: '/pass', name: "Pass", component: Pass },
        { path: '/home', name: "Home", component: Home },
        { path: '/config/users', name: "config-users", component: Users },
        { path: '/user/profile', name: "user-profile", component: Profile },
    ]
})

export default router;