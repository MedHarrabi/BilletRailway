import { ref, computed } from 'vue'
import AuthService from '../services/auth.service';
import { defineStore } from 'pinia'
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };
export const useUsersStore = defineStore('users', {
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async register(_user) {
            await AuthService.register(_user);
        },
        async login(_user) {
            await AuthService.login(_user);
        },
    }
});