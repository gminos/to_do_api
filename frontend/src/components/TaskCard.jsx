import React from 'react';
import { CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';

const priorityColors = {
    1: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',    // High
    2: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800', // Medium
    3: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800', // Low
};

const priorityLabels = {
    1: 'Alta',
    2: 'Media',
    3: 'Baja',
};

const TaskCard = ({ task, onToggle, onDelete }) => {
    return (
        <div className={`group bg-white dark:bg-gray-800 p-4 rounded-xl border transition-all duration-200 hover:shadow-md flex items-start gap-4
      ${task.is_complete ? 'border-gray-200 bg-gray-50 opacity-75 dark:border-gray-700 dark:bg-gray-800/50' : 'border-gray-200 dark:border-gray-700'}
    `}>
            <button
                onClick={() => onToggle(task.id)}
                className={`mt-1 flex-shrink-0 transition-colors ${task.is_complete ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-300 hover:text-indigo-500 dark:text-gray-600 dark:hover:text-indigo-400'}`}
            >
                {task.is_complete ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold text-lg truncate ${task.is_complete ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'}`}>
                        {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityColors[task.priority]}`}>
                        {priorityLabels[task.priority]}
                    </span>
                </div>

                {task.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{task.description}</p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    {task.due_date && (
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{task.due_date}</span>
                        </div>
                    )}
                    <span>Creado: {new Date(task.created_at).toLocaleDateString()}</span>
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                title="Eliminar tarea"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
};

export default TaskCard;
