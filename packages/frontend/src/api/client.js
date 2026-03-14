import axios from 'axios';

// 1. Create the base instance
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. THE INTERCEPTOR: Automatically attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('dj_token');
    
    // If the token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. RESPONSE INTERCEPTOR: Handle expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 (Unauthorized), Meena's session likely expired
    if (error.response && error.response.status === 401) {
      console.warn("Session expired. Redirecting to login...");
      localStorage.removeItem('dj_token');
      // window.location.href = '/login'; // Optional: Auto-logout
    }
    return Promise.reject(error);
  }
);