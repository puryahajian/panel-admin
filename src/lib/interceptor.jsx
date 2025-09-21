import axios from 'axios';
import Cookies from 'js-cookie';

const interceptor = axios.create({
  baseURL: 'https://api.bahateam.ir/',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

interceptor.interceptors.request.use(
  (config) => {
    config.headers['Accept'] = 'application/json';

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return interceptor(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get('refresh');
      if (!refreshToken) {
        Cookies.remove('access');
        // window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await interceptor.post('account/admin/api/v1/refresh/', { refresh: refreshToken });
        if (!data.access) {
          throw new Error('No access token in refresh response');
        }
        const newAccessToken = data.access;
        Cookies.set('access', newAccessToken, { expires: 7, path: '/' });
        processQueue(null, newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return interceptor(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        Cookies.remove('access');
        Cookies.remove('refresh');
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default interceptor;