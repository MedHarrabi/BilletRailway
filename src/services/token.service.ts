class TokenService {

    getUser() {
        const item = localStorage.getItem("user") || "";
        if (item) {
            return JSON.parse(item);
        }
        return null
    }

    getToken() {
        const item = localStorage.getItem("token") || "";
        if (item) {
            return JSON.parse(item);
        }
        return null
    }

    setUser(user: any) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    setToken(token: any) {
        localStorage.setItem("token", JSON.stringify(token));
    }

    removeToken() {
        localStorage.removeItem('token')
    }

    getRole() {
        const user = this.getUser();
        if (user) {
            return user.role
        }
        return '';
    }

    removeAll() {
        localStorage.clear();
    }

    async removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService()
