import axios, { AxiosInstance, AxiosResponse } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
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
      window.location.href = `${window.location.origin}/login`;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
