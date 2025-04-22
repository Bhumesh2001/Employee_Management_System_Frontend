import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://employee-management-system-backend-taupe.vercel.app/api',
    withCredentials: true,
});

export default api;