import React from 'react';

const Input = ({ label, type = 'text', id, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white dark:bg-gray-800 dark:text-white
          ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}
        `}
                {...props}
            />
            {error && <span className="text-xs text-red-500 dark:text-red-400">{error}</span>}
        </div>
    );
};

export default Input;
