import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { removeLocalStorageData } from '../context/surveyContext';

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
});

axiosClient.interceptors.request.use(
  (config) => {
    let token:string | null = localStorage.getItem('userToken'); 
        token = token? JSON.parse(token):'';
        
    config.headers.Authorization = `Basic ${token}`;
    return config;
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeLocalStorageData();
      window.location.href = `${window.location.origin}/login`;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
