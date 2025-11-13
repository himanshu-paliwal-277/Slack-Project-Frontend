import axios from 'axios';

// Create a base Axios instance
const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
});

// ✅ Add request interceptor to include token automatically
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle expired or invalid token globally
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      console.warn('Token expired or invalid. Logging out user...');

      // ✅ Clear token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // ✅ If AuthContext’s logout is available globally
      if (window.logoutUser) {
        window.logoutUser();
      } else {
        // ✅ Safe fallback redirect
        window.location.href = '/auth/signin';
      }
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
