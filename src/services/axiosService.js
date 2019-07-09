import axios from "axios";
import authService from "./authService";

class axiosService {
  instance = {};
  constructor() {
    this.initInstance();
  }
  initInstance() {
    this.instance = axios.create({
      baseURL: "/api/v1",
      timeout: 1000
    });

    this.instance.interceptors.request.use(config => {
      const token = authService.getToken();
      config.headers.Authorization = `Bearer: ${token}`;
      return config;
    });
    return this.instance;
  }

  getInstance() {
    return this.instance || this.initInstance();
  }
}

export default new axiosService();
