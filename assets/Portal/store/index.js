import { useRouter } from 'vue-router'
import { defineStore } from "pinia";
import { useLoginStore } from "./controllers/Login.js";
import moment from "moment";

// const route = useRouter()
const hoy = moment().format("YYYY-MM-DD");

export const useStore = defineStore('Store', {
    state: () => ({
        baseApp: 'http://localhost',
        baseUrl: 'http://localhost/oquendo/',
        App: 'http://localhost/oquendo/InvenTrack/public',
		loader: false, //big load
        load: false, //small load
        menu: true,
        data: [],
        route: useRouter(),
        notification: {
            state: false,
            color: '',
            text: ''
        },
        message: {
            state: false,
            color: '',
            text: ''
        },
		range: { dsd: hoy, hst: hoy }
    }),
    getters: {

    },
    actions: {
        async set_load_bar() {
            this.load = true
        },
        async close_load_bar() {
            setTimeout(() => {
                this.load = false
            }, 1300)
        },
        async set_load() {
            this.loader = true
        },
        async close_load() {
            setTimeout(() => {
                this.loader = false
            }, 1300)
        },
        async notify(item) {
            this.notification = {
				state: true,
				text: item[0],
				color: item[1],
			};
			setTimeout(() => {
				this.notification = {
					state: false,
					text: "",
					color: "",
				};
			}, 4500);
        },
        async set_message(item) {
            this.message = {
				state: true,
				text: item[0],
				color: item[1],
			};
			setTimeout(() => {
				this.message = {
					state: false,
					text: "",
					color: "",
				};
			}, 6000);
        },
        async change_page(name) {
            await this.route.push(name);
        },
        async getArrayInfo(info) {
            let jsondata = JSON.parse(info)
            let data = jsondata.map(valor => {
                let list = []
                for (const key in valor) {
                    if (Object.hasOwnProperty.call(valor, key)) {
                        list.push(valor[key]);
                    }
                }
                return list
            });
            return data
        },
        get_form_estate(element){
            if(element.$invalid && element.$dirty){
                return "is-invalid"
            } else if (!element.$invalid && element.$dirty) {   
                return "is-valid"
            } else {
                return ""
            }
        }
    }
})