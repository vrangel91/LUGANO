import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

// Interceptor para adicionar token nas requisições admin
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Não definir Content-Type se for FormData (Axios define automaticamente com boundary)
    if (!(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname.startsWith('/a')) {
        window.location.href = '/a';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

