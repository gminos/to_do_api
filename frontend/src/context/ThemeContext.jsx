import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const { user, loading } = useAuth();

    const [theme, setTheme] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (loading) return;

        const storageKey = user ? `theme_${user.username}` : 'theme_guest';

        const savedTheme = localStorage.getItem(storageKey);

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        setMounted(true);
    }, [user, loading]);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        if (!loading) {
            const storageKey = user ? `theme_${user.username}` : 'theme_guest';
            localStorage.setItem(storageKey, theme);
            localStorage.setItem('theme_global', theme);
        }
    }, [theme, user, loading, mounted]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    if (!mounted && loading) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
