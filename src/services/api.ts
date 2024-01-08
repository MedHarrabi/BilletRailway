import axios from "axios";
import tokenService from "./token.service";


const BASE_URL = 'http://localhost:3000/api'



let instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
})


instance.interceptors.request.use(
    (req) => {
        
      const token = tokenService.getToken();
      if (token) {
        req.headers["Authorization"] = 'Bearer ' + token;
        req.headers['Content-Type'] = 'application/json;charset=UTF-8'
      }
      return req;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default instance