import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
            setUser({ token, username });
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/api/token/', { username, password });
        const { access, refresh } = response.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('username', username);
        setUser({ token: access, username });
    };

    const register = async (username, email, password) => {
        await api.post('/register/', { username, email, password });
        await login(username, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('username');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
