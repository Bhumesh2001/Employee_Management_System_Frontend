import axios from 'axios';

axios.defaults.withCredentials = true; // send cookies with every request

let BackendUrl = 'https://employee-management-system-backend-taupe.vercel.app';

export const login = async (email, password, role) => {
    const response = await axios.post(`${BackendUrl}/api/auth/login`, { email, password, role });
    return response.data.data;
};

export const getUserProfile = async () => {
    const response = await axios.get(`${BackendUrl}/api/auth/profile`);
    return response.data.data;
};

export const logout = async (role) => {
    await axios.post(`${BackendUrl}/api/auth/logout`, { role });
};
