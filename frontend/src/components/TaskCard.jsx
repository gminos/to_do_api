import React from 'react';
import { CheckCircle2, Circle, Trash2, Calendar, Clock } from 'lucide-react';

const priorityConfig = {
    1: { label: 'Alta', color: 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30' },
    2: { label: 'Media', color: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30' },
    3: { label: 'Baja', color: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30' },
};

const TaskCard = ({ task, onToggle, onDelete }) => {
    const priority = priorityConfig[task.priority];

    return (
        <div className={`group glass-card p-5 rounded-2xl flex items-start gap-4 relative overflow-hidden
      ${task.is_complete ? 'opacity-60 grayscale-[0.5]' : ''}
    `}>
            <button
                onClick={() => onToggle(task.id)}
                className={`mt-0.5 flex-shrink-0 transition-all duration-300 transform hover:scale-110 
          ${task.is_complete ? 'text-primary-500' : 'text-gray-300 hover:text-primary-500 dark:text-gray-600'}
        `}
            >
                {task.is_complete ? (
                    <CheckCircle2 className="w-6 h-6 fill-primary-50 dark:fill-primary-900/20" />
                ) : (
                    <Circle className="w-6 h-6" />
                )}
            </button>

            <div className="flex-1 min-w-0 z-10 pr-10">
                <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-semibold text-lg leading-tight transition-all truncate
            ${task.is_complete ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}
          `}>
                        {task.title}
                    </h3>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-semibold flex-shrink-0 ${priority.color}`}>
                        {priority.label}
                    </span>
                </div>

                {task.description && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {task.description}
                    </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
                    {task.due_date && (
                        <div className={`flex items-center gap-1.5 ${new Date(task.due_date) < new Date() && !task.is_complete ? 'text-red-500' : ''}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(task.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 
          opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg cursor-pointer"
                title="Eliminar tarea"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

export default TaskCard;
