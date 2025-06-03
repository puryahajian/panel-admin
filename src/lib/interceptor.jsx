import axios from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
  baseURL: "https://api.baybiar.ir/",  
});

interceptor.interceptors.request.use(
  (config) => {
    config.headers['Accept'] = 'application/json';
    
    // تشخیص نوع داده و انتخاب Content-Type مناسب
    if (config.data instanceof FormData) {
      // اگر داده از نوع FormData باشه، Content-Type رو تنظیم نکن
      // مرورگر خودش مقدار مناسب می‌ذاره
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
      // اگر JSON عادی هست
    }

    const accessToken = Cookies.get('access');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
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
          const { data } = await axios.post('https://api.baybiar.ir/', { refresh: refreshToken });
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