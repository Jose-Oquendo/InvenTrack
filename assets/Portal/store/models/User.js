import { defineStore } from "pinia";
import { useLoginStore } from "../controllers/Login.js";
import { useStore } from "../index.js";

export const useUserStore = defineStore('User', {
    state: () => ({
        listUsers: [],
        editUser: {
            email: '',
            name: '',
            roles: '',
            identification: null,
        },
        registerForm: {
            email: '',
            name: '',
            ced: '',
            password: '',
            password_confirm: '',
            rol: '',
        },
        filter_user: '',
        tab_page_user: 'list',
        num_user: null,
    }),
    getters: {

    },
    actions: {
        async setEdit(user){
            this.editUser.email = user['email']
            this.editUser.name = user['name']
            this.editUser.roles = JSON.parse(user['roles'])[0]
            this.editUser.identification = parseInt(user['identification'])
        },
        async searchUsers(){
            useStore().set_load()
            try {
                const request = await fetch(`${useStore().App}/auth/users/search`, {
                    method: "POST",
					mode: "cors",
                    body: JSON.stringify({
                        txt: this.filter_user
                    }),
                    headers: useLoginStore().validHeader()
                });
                const response = await request.json();
                this.listUsers = JSON.parse(response['user'])
            } catch (error) {
                console.error('Error:', error);
            }
            useStore().close_load()
        },
        async register(){
            useStore().set_load()
            let requestBody = {
                email: this.registerForm.email,
                name: this.registerForm.name,
                ced: this.registerForm.ced,
                password: this.registerForm.password,
                rol: [this.registerForm.rol],
            }
            try {
                const request = await fetch(`${useStore().App}/auth/create`, {
                    method: "POST",
					mode: "cors",
					body: JSON.stringify(requestBody),
                    headers: useLoginStore().validHeader()
                });
                const response = await request.json();
                useStore().notify(['Se ha guardado exitosamente', 'success'])
            } catch (error) {
                console.error('Error:', error);
            }
            this.searchUsers();
            useStore().close_load()
        },
        async updateUser(){
            useStore().set_load()
            let requestBody = {
                email: this.editUser.email,
                name: this.editUser.name,
                ced: this.editUser.identification,
                rol: [this.editUser.roles],
            }
            try {
                const request = await fetch(`${useStore().App}/auth/users/edit`, {
                    method: "POST",
					mode: "cors",
					body: JSON.stringify(requestBody),
                    headers: useLoginStore().validHeader()
                });
                const response = await request.json();
                useStore().notify(['Se ha guardado exitosamente', 'success'])
            } catch (error) {
                console.error('Error:', error);
            }
            this.searchUsers();
            useStore().close_load()
        }
    }
})