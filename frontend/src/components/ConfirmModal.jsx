import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import Button from './Button';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Eliminar', cancelText = 'Cancelar' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-300 border border-gray-100 dark:border-gray-800">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-red-50 dark:bg-red-900/20 p-2.5 rounded-2xl">
                            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        {message}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1 order-2 sm:order-1"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={onConfirm}
                            className="flex-1 order-1 sm:order-2"
                        >
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
