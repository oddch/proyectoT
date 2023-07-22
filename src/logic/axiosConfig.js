import axios from 'axios';

// Establecer la URL base de tu API
axios.defaults.baseURL = 'http://protegeme.com.co:8084';

// Agregar el token a los encabezados de la solicitud
axios.interceptors.request.use((config) => {
    
  const token = localStorage.getItem('token');
  if (token) {
    
    config.headers.authentication = `${token}`;
  }
  return config;
});

export default axios;
