import axios from 'axios';

axios.defaults.withCredentials = true; // send cookies with every request

export const login = async (email, password, role) => {
    const response = await axios.post('/api/auth/login', { email, password, role });
    return response.data.data;
};

export const getUserProfile = async () => {
    const response = await axios.get('/api/auth/profile');
    return response.data.data;
};

export const logout = async (role) => {
    await axios.post('/api/auth/logout', { role });
};
