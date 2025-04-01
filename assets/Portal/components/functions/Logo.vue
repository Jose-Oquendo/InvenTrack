<template lang="">
    <div class="box-load-logo circuit-back">
        <img :src="store.baseUrl + '/assets/Portal/resources/img/inventrack.png'" alt="Logo empresa" class="load-logo"></img>
        <!-- <div class="load-logo"></div> -->
    </div> 
</template>
<script setup>
    import { useStore } from '../../store';

    const store = useStore();
</script>
<style lang="css">
    .box-load-logo{
        display: flex;
        position: absolute;
        top: 0;
        background-color: rgb(255, 255, 255);
        width: 100%;
        height: 100vh;
        z-index: 50;
        justify-content: center;
        align-items: center;
    }
    .load-logo {
        animation: spin 3s linear infinite; 
    }
    @keyframes spin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
    }

</style>