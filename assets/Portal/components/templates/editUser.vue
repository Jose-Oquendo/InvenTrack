<template lang="">
    <form @submit.prevent="" class="form-box">
        <div>
            <label class="form-label">Nombre</label>
            <input :value="user.name" class="form-control">
        </div>
        <div>
            <label class="form-label">Correo</label>
            <input :value="user.email" class="form-control">
        </div>
        <div>
            <label class="form-label">Numero de identificacion</label>
            <input value="" class="form-control" disabled>
        </div>
        <div>
            <label class="form-label">Telefono</label>
            <input value="" class="form-control">
        </div>
        <div>
            <label class="form-label">Cargo</label>
            <input value="" class="form-control">
        </div>
        <div>
            <label class="form-label">Rol</label>
            <input :value="user.roles" class="form-control" :disabled="flag == null">
        </div>
    </form>
</template>
<script setup>
    import { useStore } from '../../store/index';
    
    const props = defineProps(['user', 'flag'])
    const store = useStore();
</script>
<style lang="css">
    
</style>