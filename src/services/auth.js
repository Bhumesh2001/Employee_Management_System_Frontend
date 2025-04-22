// import api from './api';

// // auth.js
// export const login = async (email, password, role) => {
//     const response = await api.post('/auth/login', { email, password, role });
//     return response.data.data;
// };

// export const getUserProfile = async () => {
//     const response = await api.get('/auth/profile');
//     return response.data.data;
// };

// export const logout = async (role) => {
//     await api.post('/auth/logout', { role });
// };


import api from './api';

export const login = async (email, password, role) => {
    const response = await api.post(`/auth/login`, { email, password, role });
    
    console.log(response.data.data);
    
    const { token, ...userData } = response.data.data;

    // Store the token in localStorage based on the role
    if (role === 'admin') {
        localStorage.setItem('admin_token', token);
    } else if (role === 'employee') {
        localStorage.setItem('employee_token', token);
    }

    return userData; // Return only user info
};

export const getUserProfile = async (role) => {
    let token;

    // Get token based on the role
    if (role === 'admin') {
        token = localStorage.getItem('admin_token');
    } else if (role === 'employee') {
        token = localStorage.getItem('employee_token');
    }

    if (!token) throw new Error('No token found');

    const response = await api.get(`/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data;
};

export const logout = (role) => {
    // Remove the specific token from localStorage
    if (role === 'admin') {
        localStorage.removeItem('admin_token');
    } else if (role === 'employee') {
        localStorage.removeItem('employee_token');
    }
};
