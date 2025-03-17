<template lang="">
    <Loader v-if="store.loader"/>
    <Notify v-if="store.notification.state"></Notify>
    <template v-if="login.session" >
        <Navigator/>
        <main class="contain-principal circuit-back">
            <SideNavigator/>
            <RouterView />
        </main>
    </template>
    <template v-else >
        <RouterView />
    </template>
</template>
<script setup>
    import Loader from './components/functions/Loader.vue';
    import Notify from './components/functions/Notify.vue';
    import subcribe from './store/token.js';
    import Navigator from './components/Navigator.vue'
    import SideNavigator from './components/SideNavigator.vue'
    import { RouterView } from 'vue-router';
    import { useStore } from './store/index';
    import { useLoginStore } from './store/controllers/Login';
    import { onMounted, onBeforeMount } from 'vue';

    const store = useStore();
    const login = useLoginStore();

    onBeforeMount(async () => {
        if(localStorage.getItem('token')){
            await login.attemp(localStorage.getItem('token'), localStorage.getItem('user'), localStorage.getItem('expired'))
            subcribe()
        }
    }) 

</script>
<style lang="css">
    .contain-principal {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100%;
        overflow: hidden;
    }
</style>