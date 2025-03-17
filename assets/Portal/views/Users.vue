<template lang=""> 
    <main class="mycontainer main-content">
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link" :class="user.tab_page_user == 'list' ? 'active' : ''" aria-current="page" @click="user.tab_page_user = 'list'"><i class="bi bi-person"></i> Listar Usuarios</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="user.tab_page_user == 'create' ? 'active' : ''" @click="user.tab_page_user = 'create'">Agregar Usuario</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="user.tab_page_user == 'rol' ? 'active' : ''" @click="user.tab_page_user = 'rol'">Roles</a>
            </li>
        </ul>
        <section>
            <div class="tab-content" v-if="user.tab_page_user == 'list'">
                <ViewUser/>
            </div>
            <div class="tab-content" v-if="user.tab_page_user == 'create'">
                <RegisterUser/>
            </div>
            <div class="tab-content" v-if="user.tab_page_user == 'rol'">
                <div>Vizualizar roles existentes</div>
            </div>
        </section>
    </main>
</template>
<script setup>
    import { ref, onMounted } from 'vue';

    import { useUserStore } from '../store/models/User';
    import datable from '../components/templates/datable.vue';
    import RegisterUser from '../components/Users/RegisterUser.vue';
    import ViewUser from '../components/Users/ViewUser.vue';

    const user = useUserStore()

    onMounted(async () => {
        await user.searchUsers();
    })

</script>
<style lang="css">
    
</style>