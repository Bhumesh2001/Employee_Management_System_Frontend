import api from './api';

export const login = async (email, password, role) => {
    const response = await api.post(`/api/auth/login`, { email, password, role });
    return response.data.data;
};

export const getUserProfile = async () => {
    const response = await api.get(`/api/auth/profile`);
    return response.data.data;
};

export const logout = async (role) => {
    await api.post(`/api/auth/logout`, { role });
};
