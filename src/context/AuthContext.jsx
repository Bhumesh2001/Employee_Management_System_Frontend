import { createContext, useState } from 'react';
import { login, getUserProfile, logout as apiLogout } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (email, password, role) => {
        try {
            setLoading(true);
            await login(email, password, role);         // server sets token
            const profile = await getUserProfile();     // fetch user profile            
            setUser(profile);
        } catch (error) {
            console.error('Login failed:', error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (role) => {
        try {
            await apiLogout(role); // clear cookie
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error.message);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
