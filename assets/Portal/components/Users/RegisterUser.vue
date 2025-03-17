<template lang="">
    <div>
        <form @submit.prevent="handleRegister()">
            <div>
                <label class="form-label">Correo electronico</label>
                <input type="email" class="form-control" v-model="user.registerForm.email" :class="store.get_form_estate(v$userform.email)" @blur="v$userform.email.$touch">
                <div class="form-text">
                    <div class="invalid-feedback" v-if="v$userform.email.$invalid" >
                        <span class="invalid-feedback" v-for="error of v$userform.email.$errors" :key="error.$uid">
                            <span class="error-msg">{{ error.$message }}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <div class="flex-fill">
                    <label class="form-label">Nombre</label>
                    <input type="text" autocomplete="username" class="form-control" v-model="user.registerForm.name" :class="store.get_form_estate(v$userform.name)" @blur="v$userform.name.$touch">
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$userform.name.$invalid" >
                            <span class="input-errors" v-for="error of v$userform.name.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-fill">
                    <label class="form-label">Identificacion</label>
                    <input type="number" class="form-control" v-model="user.registerForm.ced" :class="store.get_form_estate(v$userform.ced)" @blur="v$userform.ced.$touch">
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$userform.ced.$invalid" >
                            <span class="input-errors" v-for="error of v$userform.ced.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex">
                <div class="flex-fill">
                    <label class="form-label">Clave</label>
                    <input type="password" autocomplete="new-password" class="form-control" v-model="user.registerForm.password" :class="store.get_form_estate(v$userform.password)" @blur="v$userform.password.$touch">
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$userform.password.$invalid" >
                            <span class="input-errors" v-for="error of v$userform.password.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-fill">
                    <label class="form-label">Confirma la clave</label>
                    <input type="password" autocomplete="new-password" class="form-control" v-model="user.registerForm.password_confirm" :class="store.get_form_estate(v$userform.password_confirm)" @blur="v$userform.password_confirm.$touch">
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$userform.password_confirm.$invalid" >
                            <span class="input-errors" v-for="error of v$userform.password_confirm.$errors" :key="error.$uid">
                                <div class="error-msg">{{ error.$message }}</div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <label class="form-label">Permisos</label>
                <select class="form-control" v-model="user.registerForm.rol" :class="store.get_form_estate(v$userform.rol)" @blur="v$userform.rol.$touch">
                    <option value="admin">Admin</option>
                    <option value="coordinador">Coordinador</option>
                    <option value="ventas">Ventas</option>
                    <option value="call">Call</option>
                </select>
                <div class="form-text">
                    <div class="invalid-feedback" v-if="v$userform.rol.$invalid" >
                        <span class="input-errors" v-for="error of v$userform.rol.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </span>
                    </div>
                </div>
            </div>
            <div class="my-3">
                <button class="btn btn-success" type="submit"> Enviar</button>
            </div>
        </form>
    </div>
</template>
<script setup>
    import { computed } from 'vue';
    import { useUserStore } from '../../store/models/User';
    import { useStore } from '../../store';

    import { required, email, minLength, integer, alphaNum, alpha, sameAs } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'

    const store = useStore()
    const user = useUserStore()
    const passwordFromStore = computed(() => user.registerForm.password);

    /*
    lpha, alphaNum, and, between, createI18nMessage, decimal, email, helpers, integer, ipAddress, macAddress, maxLength, maxValue, minLength, minValue, not, numeric, or, required, requiredIf, requiredUnless, sameAs, url
    */
    const v$userform = useVuelidate({
        email: { required, email },
        name: { required },
        ced: { required, integer },
        password: { required, minLength: minLength(6)},
        password_confirm: { required, sameAs: sameAs(passwordFromStore) },
        rol: { required },
    }, user.registerForm)

    const handleRegister = async () => {
        const result = await v$userform.value.$validate()
        if(result){
            user.register();
            user.tab_page_user = 'list';
            v$userform.value.$reset();
        }
    }

</script>
<style lang="css">
    
</style>