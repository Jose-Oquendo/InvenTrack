<template lang="">
    <header class="shadow">
        <nav class="top-nav navbar navbar-dark shadow">
            <div class="brand" :class="store.menu ? 'open' : 'close'">
                <a class="navbar-brand" href="#">
                    <img :src="store.baseUrl + '/assets/Portal/resources/img/inventrack.png'" alt="" height="40" width="200" class="d-inline-block align-top">
                </a>
                <span class="menu-icon" :class="store.menu ? 'open' : 'close'" @click="store.menu = !store.menu">
                    <div class="bar"></div>
                    <div class="bar"></div> 
                    <div class="bar"></div>
                    <div class="bar"></div>
                </span>
            </div>
            <div class="top-menu box-show">
                <ul class="navbar-nav" v-if="login.isAuhthenticated">
                    <li class="nav-item ">Bienvenido {{login.getUser.name}}!</li>
                    <li class="nav-item">
                        <div class="dropdown">
                            <div role="button" class="nav-item user-item dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                                <img :src="store.baseUrl + '/assets/Portal/resources/img/user.png'" alt="Profile_usuario">
                            </div>
                            <ul class="dropdown-menu">
                                <li><div class="dropdown-header"><i class="bi bi-person-circle"></i> {{login.getUser.email}}</div></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><router-link class="dropdown-item" to="/user/profile">Mi perfil</router-link></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" role="button" @click="login.logout()">Cerrar sesion</a></li>
                                <li>
                                    <div class="dropdown-header item-footer">@OquendoSoft</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>
<script setup>
    import { ref } from 'vue';
    import { useStore } from '../store/index';
    import { useLoginStore } from '../store/controllers/Login';

    const store = useStore();
    const login = useLoginStore();

</script>
<style lang="css">
    
</style>