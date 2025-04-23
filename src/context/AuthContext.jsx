import { createContext, useEffect, useState } from 'react';
import { login, getUserProfile, logout as apiLogout } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUser(profile);
            } catch (err) {
                console.log(err);
                console.log('Auto-login failed');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const loginUser = async (email, password, role) => {
        await login(email, password, role);
        const profile = await getUserProfile();
        setUser(profile);
    };

    const logout = async (role) => {
        await apiLogout(role);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
