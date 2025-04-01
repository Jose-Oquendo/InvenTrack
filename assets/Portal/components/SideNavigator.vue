<template lang="">
    <nav class="side-nav navbar navbar-dark" :class="store.menu ? 'open' : 'close'">
        <div class="menu">
            <div class="line-decoration"></div>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link @click="close_menu" class="nav-link" to="/home"><i class="bi bi-building-fill" title="Principal"></i> <span>Inicio</span></router-link>
                </li>
                <li class="nav-item dropdown-center" v-for="(item, index) in login.menu" :key="index">
                    <div style="width: 95%;" v-if="item.type == 'program'">
                        <router-link :to="item.data" class="nav-link">
                            <i :class="item.icon" :title="index"></i>  {{ index }}
                        </router-link>
                    </div>
                    <div style="width: 95%;" v-else>
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" data-bs-auto-close="inside" aria-expanded="false">
                            <i :class="item.icon" :title="index"></i> {{ index }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li v-for="(page, nam) in item.data" :key="nam">
                                <router-link class="dropdown-item" :to="page.data">
                                    <i :class="page.icon"></i> {{ nam }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="menu-footer">
            <div class="top-menu box-hide">
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
        </div>
    </nav>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { useStore } from '../store/index';
    import { useLoginStore } from '../store/controllers/Login';

    const store = useStore();
    const login = useLoginStore();

    onMounted(() => {
        login.chargePage();
    })

    const close_menu = () => {
        store.menu = false
    }

</script>
<style lang="css">
    
</style>
