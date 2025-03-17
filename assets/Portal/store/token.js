import { useStore } from "./index.js";
import { useLoginStore } from './controllers/Login';

const setMyUser = (usr) => {
    console.log('set u');
    localStorage.setItem('user', usr)
}

const delMyUser = () => {
    console.log('del u');
    if(localStorage.getItem('user')){
        localStorage.removeItem('user')
    }
}

const setMyToken = (tk, exp) => {
    console.log('set t');
    localStorage.setItem('token', tk)
    localStorage.setItem('expired', exp)
}

const delMyToken = () => {
    console.log('del t');
    if(localStorage.getItem('token')){
        localStorage.removeItem('token')
    }
    if(localStorage.getItem('expired')){
        localStorage.removeItem('expired')
    }
}

const subcribe = () => {
    const login = useLoginStore();
    login.$subscribe((mutation, state) => {
        console.log('Subscribe dev');
        if(state && state.token){ setMyToken(state.token, state.expired); } 
        // else { delMyToken(); }

        if(state && state.user){ setMyUser(state.user['identification']); } 
        // else { delMyUser(); }
        // if(mutation.events){} else {}
    })
}

export default subcribe;