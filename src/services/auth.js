import api from './api';

// auth.js
export const login = async (email, password, role) => {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data.data;
};

export const getUserProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data.data;
};

export const logout = async (role) => {
    await api.post('/auth/logout', { role });
};
