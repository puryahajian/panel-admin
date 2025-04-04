import axios from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
  baseURL: "https://mediplant.ir/",  
});

interceptor.interceptors.request.use(
  (config) => {
    // config.headers['Content-Type'] = 'multipart/form-data';
    // const accessToken = Cookies.get('access');
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Accept'] = 'application/json';
    config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0ODg5NTkzLCJpYXQiOjE3NDM2Nzk5OTMsImp0aSI6IjI4NmJiZmMyOWYzMzQ2ODBhZGM3ZGU2NzkzOWIxMmQ4IiwidXNlcl9pZCI6MX0.PnBwiN60S8tqcOhz1XwC0L9WDXQzI-SUIrXvpPKiX7k`;
    // if (accessToken) {
    // }
    
    return config;
  },
  (error) => Promise.reject(error)
);

interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh');

      if (refreshToken) {
        try {
          const { data } = await axios.post('https://mediplant.ir/', { refresh: refreshToken });
          const newAccessToken = data.access;
          Cookies.set('access', newAccessToken, { expires: 7, path: '/' });
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return interceptor(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          Cookies.remove('access');
          Cookies.remove('refresh');
          // Optionally redirect user to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default interceptor;