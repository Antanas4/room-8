import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';

type AuthContextType = {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check session on app start
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/me', { withCredentials: true });
                setUser(response.data); // Set user if session is valid
            } catch (err) {
                setUser(null); // Clear user if session is invalid
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                { username, password },
                { withCredentials: true }
            );

            setUser(response.data); // Set user data from login response
            router.push('/main'); // Navigate to the main screen
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Let the caller handle errors
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/api/users/logout', {}, { withCredentials: true });
            setUser(null); // Clear user data
            router.push('/login'); // Navigate back to login screen
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

