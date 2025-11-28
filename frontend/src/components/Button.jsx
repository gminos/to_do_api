import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white shadow-lg shadow-primary-500/30 border border-transparent",
        secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 border border-transparent",
        "outline-danger": "bg-red-50/50 border border-red-200 text-red-600 hover:bg-red-100 focus:ring-red-500 dark:bg-red-900/10 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30",
        ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
