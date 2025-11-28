import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LogOut, CheckSquare, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
            <nav className="sticky top-0 z-50 border-b border-white/20 dark:border-gray-700/30 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl transition-all duration-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-primary-600 dark:text-primary-400">
                        <div className="bg-primary-100 dark:bg-primary-900/30 p-1.5 rounded-lg">
                            <CheckSquare className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-display">To-Do API</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {user && (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 hidden sm:block">
                                    {user.username}
                                </span>
                                <Button variant="outline-danger" onClick={logout} className="text-xs py-1.5 px-3 rounded-lg">
                                    <LogOut className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Salir</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
