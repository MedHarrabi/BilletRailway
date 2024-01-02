import axios from 'axios';


const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    return axios
        .post(API_URL + 'signin', {
          username: user.username,
          password: user.password
        })
        .then(response => {
          console.log("ALOOO", response)
          if (response.data.accessToken) {
            console.log("ALOOO1")
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          return response.data;
        });
  }
  register(user) {
    // Create headers object
    const headers = {};

    // Check if user has an accessToken
    if (user && user.accessToken) {
      headers['x-access-token'] = user.accessToken;
    }

    // Make the POST request with the specified headers
    return axios.post(`${API_URL}signup`, {
      username: user.username,
      email: user.email,
      password: user.password
    }, {
      headers: headers
    });
  }
}

export default new AuthService();
