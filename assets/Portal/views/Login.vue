<template lang="">
    <main class="container-login">
        <div class="area"><Background></Background></div>
        <Loader v-if="view"/>
        <form @submit.prevent="handleLogin()" v-if="!view" class="form-login">
            <div class="img-login text-center my-3">
                <img :src="store.baseUrl + '/assets/Portal/resources/img/invenlogo.png'" alt="imagen del aplicativo" height="100" class="d-inline-block align-top">
                <div class="h3">BIENVENIDO</div>
            </div>
            <div class="content-login">
                <div>
                    <label>Usuario</label>
                    <input class="form-control" type="number" placeholder="Ingrese Usuario" autocomplete="off" v-model="login.loginData.identification" :class="store.get_form_estate(v$loginform.identification)" @blur="v$loginform.identification.$touch" >
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$loginform.identification.$invalid" >
                            <span class="invalid-feedback" v-for="error of v$loginform.identification.$errors" :key="error.$uid">
                                <span class="error-msg">{{ error.$message }}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <label>Contraseña</label>
                    <input class="form-control" type="password" placeholder="Ingrese Contraseña" autocomplete="off" v-model="login.loginData.password" :class="store.get_form_estate(v$loginform.password)" @blur="v$loginform.password.$touch" >
                    <div class="form-text">
                        <div class="invalid-feedback" v-if="v$loginform.password.$invalid" >
                            <span class="invalid-feedback" v-for="error of v$loginform.password.$errors" :key="error.$uid">
                                <span class="error-msg">{{ error.$message }}</span>
                            </span>
                        </div>
                    </div>
                    <!--<div>
                        <router-link class="link-light" to="/pass">Olvido su contraseña??</router-link>
                    </div>-->
                </div>
                <div class="d-grid w-100">
                    <button class="btn btn-success button-login rounded-pill p-0" type="submit">Ingresar</button>
                    <div class="message-login"></div>
                </div>
                <div v-if="store.message.state" class="alert" :class="store.message.color">
                    <i class="bi bi-exclamation-circle"></i>
                    {{ store.message.text }}
                </div>
                <Load v-if="store.load" />
            </div>
        </form>
    </main>
</template>
<script setup>
    import Loader from '../components/functions/Loader.vue';
    import Load from '../components/functions/Load.vue';
    import Logo from '../components/functions/Logo.vue';
    import Background from '../components/functions/Background.vue';

    import { useLoginStore } from '../store/controllers/Login'
    import { useStore } from '../store';
    import { required, email, integer, minLength, alphaNum, sameAs } from '@vuelidate/validators'
    import { useVuelidate } from '@vuelidate/core'
    import { onMounted, ref } from 'vue';

    const store = useStore();
    const login = useLoginStore();
    let view = ref(true);

    const v$loginform = useVuelidate({
        identification: { required, integer},
        password: { required, minLength: minLength(6)}
    }, login.loginData)

    const charge_load = () => {
        view.value = true;
        setTimeout(() => {
            view.value = false;
        }, 3100);
    }

    const handleLogin = async () => {
        const result = await v$loginform.value.$validate()
        if(result){
            await login.access()
            charge_load()
            v$loginform.value.$reset();
        }
    }
    
    onMounted(() => {
        charge_load()
    })
  
</script>
<style lang="css">
    .container-login{
        display: flex;
        position: relative;
        height: 100vh;
        width: 100%;
    }
    .form-login{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 15%;
        background-color: transparent;
        z-index: 50;
    }
    .form-login *{
        font-size: var(--text-md);
    }
    .form-login label,
    .form-login span *,
    .form-login .alert{
        color: var(--light);
    }
    .form-login .form-control{
        min-width: 40vh;
    }
    .form-login .form-control.is-valid{
        border-color: var(--bs-primary-border-subtle) !important;
        background-image: url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27%3e%3cpath fill=%27%230D6EFD%27 d=%27M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z%27/%3e%3c/svg%3e');
    }
    .content-login{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1em;
    }
    @media (max-width: 800px) {
        .container-login{
            justify-content: center;
            align-items: center;
        }
        .form-login{
            height: auto;
            width: 70%;
            padding: 2em;
            border-radius: 10px;
        }
    }
    /***background****/
    .area{
        background-image: url('../resources/img/04bf90_fb31b5ba35d84b1688ccfab9f20f9be7.jpg');
        background-position: center;
        background-attachment: fixed;
        background-size: cover;
        object-fit: contain;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .area::after{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background-color: var(--nav-bg);
        opacity: 0.7;
    }
</style>