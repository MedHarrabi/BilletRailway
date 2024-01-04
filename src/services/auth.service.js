import axios from "../services/api";
import token_service from "../services/token.service";

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  async login(user) {
    const response = await axios.post('api/signin', {
      username: user.username,
      password: user.password
    })

    return response.data
  }

  async register(user) {
    const response = await axios.post('api/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })

    return response.data
  }

  logout() {
    // remove token from local storage and set auth status to null
    token_service.removeAll();
  }
}

export default new AuthService();
