import AuthService from '../services/auth.service';
import { defineStore } from 'pinia'
import tokenService from '../services/token.service';
//const user = JSON.parse(tokenService.getUser());
const user = tokenService.getUser();

const initialState = user
    ? {
        status: { loggedIn: true },
        user
    }
    : {
        status: { loggedIn: false },
        user: null
    };

export const useUsersStore = defineStore('users', {
    state: () => ({
        ...initialState
    }),
    getters: {
        isLoggedIn: (state) => { return state.status.loggedIn; },
        getUser: (state) => { return state.user; }
    },
    actions: {
        async register(_user) {
            const data = await AuthService.register(_user);
            if (data) {
                this.$patch({
                    user: data,
                    status: { loggedIn: true }
                })
                tokenService.setToken(data.token);
                tokenService.setUser(data.user)
            }
        },
        async login(_user) {
            const data = await AuthService.login(_user);
            if (data) {
                this.$patch({
                    user: data,
                    status: { loggedIn: true }
                })
                tokenService.setToken(data.token);
                tokenService.setUser(data?.user)
            }
        },
        logout() {
            tokenService.removeAll()
            this.$patch({
                status: { loggedIn: false },
                user: null
            })
        }
    }
});