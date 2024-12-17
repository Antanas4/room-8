import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'expo-router';

type AuthContextType = {
    user: any;
    login: (username: string, password: string) => Promise<void>;
    signup: (firstName: string, lastName: string, phoneNumber: string, username: string,
             password: string, dateOfBirth: string, gender: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const signup = async (firstName: string, lastName: string, phoneNumber: string, username: string,
                          password: string, dateOfBirth: string, gender: string) => {
        try {
            await axios.post(
                'http://localhost:8080/api/users/register',
                { firstName, lastName, phoneNumber, username, password, dateOfBirth, gender},
                { withCredentials: true }
            );
            router.push('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/login',
                { username, password },
                { withCredentials: true }
            );
            setUser(response.data);
            router.push('/main');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                'http://localhost:8080/api/users/logout', // API endpoint
                {}, // Empty body (if no payload is required for logout)
                {
                    withCredentials: true, // Include cookies in the request
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setUser(null); // Reset the user state
            router.push('/login'); // Navigate back to login screen
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };


    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
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

