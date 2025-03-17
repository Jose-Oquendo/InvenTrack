<template lang="">
   <main class="mycontainer">
        <div>
            <p class="title title-center">Bienvenido</p>
            <div class="line-decoration-page"></div>
        </div>
        <section>
            <div class="profile-home">
                <div class="photo">
                    <img src="" alt="Usuario">
                </div>
                <div class="description"></div>
            </div>
            <div class="user-home">
                <div v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"></div>
            </div>
        </section>
    </main>
</template>
<script setup>
    import { useStore } from '../store';
    import { onMounted } from 'vue';
    let store = useStore()

</script>
<style lang="css">
    .profile-home{
        display: flex;
        justify-content: center;
        position: relative;
    }
    .profile-home .photo{
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        left: 5%;
        width: 18vh;
        height: 18vh;
    }
    .profile-home .photo img{
        object-fit: cover;
        width: 18vh;
        height: 18vh;
    }
    .profile-home .description{
        background-color: var(--iv-back);
        width: 75%;
        min-height: 20vh;
        border-radius: 15px;
    }
    .user-home{
        margin: 15px 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
    }
    .user-home div{
        background-color: rgba(112, 128, 144, 0.585);
        border: 1px solid slategray;
        width: 150px;
        height: 150px;
        border-radius: 15px;
    }
</style>