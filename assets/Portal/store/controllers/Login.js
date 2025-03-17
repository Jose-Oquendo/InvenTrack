import { defineStore } from "pinia"
import { useStore } from "../index.js";
import moment from "moment";

export const useLoginStore = defineStore('Login', {
    state: () => ({
        loginData: {
            identification: '',
            password: ''
        },
        dataRestore: {
            email: '',
        },
        flag: null,
		session: false,
        token: null,
        expired: null,
        user: null,
        menu: {},
    }),
    getters: {
        isAuhthenticated(state){
            return state.token && state.user ? true : false
        },
        getUser(state){
            return state.user
        },
        getMenu(state) {
			return state.menu;
		},
    },
    actions: {
        async access() {
            useStore().set_load_bar()
            let requestBody = {
                identification: String(this.loginData.identification),
                password: this.loginData.password,
                _remenber_me: true
            }
            try {
                const request = await fetch(`${useStore().App}/api/login`, {
                    method: "POST",
					mode: "cors",
					body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const response = await request.json();
                if(request.status == 401){
                    await useStore().close_load_bar()
                    useStore().set_message(['La contraseña o el usuario no son validos.', 'message'])
                } else {
                    let time = moment().add(15, 'minutes').format('YYYY-MM-DD H:mm:ss');
                    await this.attemp(response['token'], this.loginData.identification, time)
                }
            } catch (error) {
                useStore().set_message(['No se ha podido realizar el login', 'danger'])
                console.error('Error:', error);
            }
            useStore().close_load_bar()
        },
        async restore() {
            useStore().set_load_bar()
            let requestBody = {
                email: String(this.dataRestore.email),
            }
            try {
                const request = await fetch(`${useStore().App}/auth/password`, {
                    method: "POST",
					mode: "cors",
					body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const response = await request.json();
                if(request.status == 401){
                    useStore().set_message(['La contraseña o el usuario no son validos.', 'message'])
                } else {
                    useStore().set_message(['Validado correctamente.', 'message'])
                }
            } catch (error) {
                useStore().set_message(['No se ha podido realizar el login', 'danger'])
                console.error('Error:', error);
            }
            useStore().close_load_bar()
        },
        async attemp(validateToken, user, time) {
            if(!time || time == null || time == undefined || time == ''){
                time == moment().format('YYYY-MM-DD H:mm:ss')
            }
            if(time < moment().format('YYYY-MM-DD H:mm:ss')){
                this.logout()
            } else {
                if(validateToken){
                    this.token = validateToken
                    this.expired = time;
                }
                if(!this.token){
                    return;
                }
                try {
                    const request = await fetch(`${useStore().App}/auth/users/in`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': await this.validHeader()
                        },
                        body: JSON.stringify({
                            username: user,
                        })
                    });
                    const response = await request.json();
                    let response_user = JSON.parse(response['user'])
                    this.user = response_user[0]
                    this.chargePage();
                } catch (error) {
                    this.user = null;
                    this.token = null;
                    this.expired = null;
                    this.session = false;
                    useStore().notify(['Usted no es un usuario registrado o no se ha autenticado correctamente.', 'message'])
                    this.logout();
                    console.error('Error:', error);
                }
            }
        },
        async chargePage(){
            let req = await fetch(`${useStore().baseUrl}/appteco/assets/Portal/api/${JSON.parse(this.user.roles)[0]}.json`, {
                method: "GET",
                mode: "no-cors",
            });
            req = await req.json();
            this.menu = req;

            setTimeout(() => {
                this.session = true;
                useStore().change_page("/home");
            }, 2500);
        },
        async logout() {
            await useStore().change_page("/");
            localStorage.removeItem("token")
            localStorage.removeItem("expired")
            localStorage.removeItem("user")
            this.user = null;
            this.token = null;
            this.expired = null;
            this.session = false;
        },
        async eraseSession(){
            useStore().change_page("/");
            this.session = false;
        },
        async validHeader(){
            if(this.token){
                return 'Bearer '+this.token
            } else {
                return null;
            }
        }
    }
})