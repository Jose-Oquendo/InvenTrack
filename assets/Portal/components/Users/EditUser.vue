<template lang="">
    <!-- Modal -->
    <div class="modal fade" id="detailsConfigUser" aria-labelledby="detailsConfigUserLabel" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="detailsConfigUserLabel">Control de usuarios</h1>
                    <button type="button" @click="cleanForm()" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="handleUpdate()" class="form-box">
                        <div>
                            <label class="form-label">Correo electronico</label>
                            <input type="email" class="form-control" v-model="user.editUser.email" :class="store.get_form_estate(v$EditUserform.email)" @blur="v$EditUserform.email.$touch">
                            <div class="form-text">
                                <div class="invalid-feedback" v-if="v$EditUserform.email.$invalid" >
                                    <span class="invalid-feedback" v-for="error of v$EditUserform.email.$errors" :key="error.$uid">
                                        <span class="error-msg">{{ error.$message }}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="form-label">Nombre</label>
                            <input type="text" autocomplete="username" class="form-control" v-model="user.editUser.name" :class="store.get_form_estate(v$EditUserform.name)" @blur="v$EditUserform.name.$touch">
                            <div class="form-text">
                                <div class="invalid-feedback" v-if="v$EditUserform.name.$invalid" >
                                    <span class="input-errors" v-for="error of v$EditUserform.name.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="form-label">Identificacion</label>
                            <input type="number" class="form-control" v-model="user.editUser.identification" :class="store.get_form_estate(v$EditUserform.identification)" @blur="v$EditUserform.identification.$touch">
                            <div class="form-text">
                                <div class="invalid-feedback" v-if="v$EditUserform.identification.$invalid" >
                                    <span class="input-errors" v-for="error of v$EditUserform.identification.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label class="form-label">Permisos</label>
                            <select class="form-control" v-model="user.editUser.roles" :class="store.get_form_estate(v$EditUserform.roles)" @blur="v$EditUserform.roles.$touch">
                                <option value="admin">Admin</option>
                                <option value="coordinador">Coordinador</option>
                                <option value="ventas">Ventas</option>
                                <option value="call">Call</option>
                            </select>
                            <div class="form-text">
                                <div class="invalid-feedback" v-if="v$EditUserform.roles.$invalid" >
                                    <span class="input-errors" v-for="error of v$EditUserform.roles.$errors" :key="error.$uid">
                                        <div class="error-msg">{{ error.$message }}</div>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="my-3">
                            <button class="btn btn-success" data-bs-dismiss="modal" aria-label="Close" type="submit"> Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { computed } from 'vue';
    import { useUserStore } from '../../store/models/User';
    import { useStore } from '../../store';
    import { required, email, minLength, integer, alphaNum, alpha, sameAs } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'
    
    const store = useStore()
    const user = useUserStore()

    const v$EditUserform = useVuelidate({
        email: { required, email },
        name: { required },
        roles: { required },
        identification: { required, integer },
    }, user.editUser)

    const cleanForm = () => {
        v$EditUserform.value.$reset();
        user.num_user = null 
    }

    onMounted(() => {
        v$EditUserform.value.$reset();
    })

    const handleUpdate = async () => {
        const result = await v$EditUserform.value.$validate()
        if(result){
            user.updateUser();
            document.getElementById('detailsConfigUser')
            v$EditUserform.value.$reset();
        }
    }


</script>
<style lang="">
    
</style>