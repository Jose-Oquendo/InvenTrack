<template lang="">
    <section>
        <form @submit.prevent="user.searchUsers()">
            <div class="input-group my-3">
                <input v-model="user.filter_user" class="form-control" placeholder="Buscar...">
                <span class="input-group-text border-left-0">
                    <button class="btn" type="submit"><i class="bi bi-search"></i></button>
                </span>
            </div>
        </form>
    </section>
    <div class="table-responsive">
        <span class="d-flex">{{user.listUsers.length}} usuarios registrados.</span>
        <table class="table table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Nombre de usuario</th>
                    <th>Correo electronico</th>
                    <th>No. Identificacion</th>
                    <th>Cargo</th>
                    <th>Rol</th>
                    <th>Fecha de creacion</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in user.listUsers">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.identification ?? '---' }}</td>
                    <td>{{ user.job ?? '---' }}</td>
                    <td>{{ user.roles }}</td>
                    <td>{{ user.created_at ?? '---' }}</td>
                    <td>
                        <button class="btn btn-primary" @click="change_user(index)" data-bs-toggle="modal" data-bs-target="#detailsConfigUser">
                            <i v-if="user.num_user == index" class="bi bi-folder2-open"></i>
                            <i v-else class="bi bi-folder"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
       <EditUser></EditUser>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { computed } from 'vue';
    import EditUser from './EditUser'
    import { useUserStore } from '../../store/models/User';
    import { useStore } from '../../store';

    const store = useStore()
    const user = useUserStore()

    const change_user = (index) => {
        if(user.num_user == index){ 
            user.num_user = null 
        } else {
            user.num_user = index;
            user.setEdit(user.listUsers[index])
        }
    }

</script>
<style lang="css">
    
</style>