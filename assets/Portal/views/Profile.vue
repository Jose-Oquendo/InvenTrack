<template lang="">
    <main class="mycontainer">
        <div class="user-profile">
            <div class="photo">
                <img :src="store.baseUrl + '/assets/Portal/resources/img/user.png'" alt="Usuario">
            </div>
            <div class="details">
                <ul class="list-info">
                    <li class="bg-dark text-white">
                        <p>Perfil</p>
                        <p><button class="btn btn-dark border-white" data-bs-toggle="modal" data-bs-target="#profileUser"><i class="bi bi-pencil"></i></button></p>
                    </li>
                    <li>
                        <p>Nombre de usuario</p>
                        <p>{{ login.getUser.name ?? '---' }}</p>
                    </li>
                    <li>
                        <p>Correo electronico</p>
                        <p>{{ login.getUser.email ?? '---' }}</p>
                    </li>
                    <li>
                        <p>Telefono</p>
                        <p>{{ login.getUser.phone ?? '---' }}</p>
                    </li>
                    <li>
                        <p>No. Identificacion</p>
                        <p>{{ login.getUser.identification ?? '---' }}</p>
                    </li>
                    <li>
                        <p>Cargo</p>
                        <p>{{ login.getUser.job ?? '---' }}</p>
                    </li>
                    <li>
                        <p>Rol</p>
                        <p>{{ login.getUser.roles ?? '---' }}</p>
                    </li>
                </ul>
                <!-- Modal -->
                <div class="modal fade" id="profileUser" tabindex="-1" aria-labelledby="profileUserLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header bg-light">
                                <h1 class="modal-title fs-5" id="profileUserLabel">Editar perfil de usuario</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <editUser :user="login.getUser"></editUser>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
    import { ref } from 'vue';
    import { useStore } from '../store/index';
    import { useLoginStore } from '../store/controllers/Login';
    import editUser from '../components/templates/editUser.vue';

    const store = useStore();
    const login = useLoginStore();

</script>
<style lang="css">
    .user-profile{
        display: flex;
        justify-content: center;
    }
    .user-profile .photo{
        border-radius: 15px 0px 0px 15px;
        overflow: hidden;
        width: 20vh;
        height: auto;
    }
    .user-profile .photo img{
        object-fit: cover;
        width: 20vh;
        height: -webkit-fill-available;
    }
    .user-profile .details{
        background-color: var(--light);
        width: 100%;
    }
</style>