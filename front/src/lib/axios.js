import axios from 'axios';

// Request interceptor
axios.interceptors.request.use(
  config => {
    // Here you can do something before the request is made (like setting the Authorization header)
    // if (store.getters.token) {
    //  config.headers['Authorization'] = 'Bearer ' + getToken();
    // }
    return config;
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  response => response,
  error => {
    // Here you can handle errors
    return Promise.reject(error);
  }
);

export default axios;