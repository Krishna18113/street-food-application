import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Your backend API base URL
  timeout: 5000,
});

// Request interceptor to add the authorization token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;