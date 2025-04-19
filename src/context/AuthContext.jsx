import { createContext, useState, useEffect } from 'react';
import { login, getUserProfile, logout as apiLogout } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const profile = await getUserProfile();
                setUser(profile);
            } catch (error) {
                console.error('Failed to fetch user profile', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const loginUser = async (email, password, role) => {
        await login(email, password, role); // token cookie set by server
        const profile = await getUserProfile(); // get user details from token
        setUser(profile);
    };

    const logout = async (role) => {
        try {
            await apiLogout(role); // clears cookie
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
