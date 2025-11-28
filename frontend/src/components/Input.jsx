import React from 'react';

const Input = ({ label, type = 'text', id, error, className = '', ...props }) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`px-4 py-2.5 rounded-xl border bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm outline-none transition-all duration-200
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 dark:border-red-800'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:border-primary-400'}
          text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
        `}
                {...props}
            />
            {error && <span className="text-xs text-red-500 dark:text-red-400 ml-1">{error}</span>}
        </div>
    );
};

export default Input;
