import axiosInstance from "./api";
import tokenService from "./token.service";


const setup = (store: any) => {
    axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = tokenService.getToken();
        if (token) {
          config.headers["Authorization"] = 'Bearer ' + token;
          config.headers['Content-Type'] = 'application/json;charset=UTF-8'
           
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };