import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Loader2, Sparkles, X } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [greeting, setGreeting] = useState('');

    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 3, due_date: '' });

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Buenos días');
        else if (hour < 18) setGreeting('Buenas tardes');
        else setGreeting('Buenas noches');
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks/');
            const data = response.data.results ? response.data.results : response.data;
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const taskData = { ...newTask };
            if (!taskData.due_date) {
                taskData.due_date = null;
            }
            await api.post('/api/tasks/', taskData);
            setNewTask({ title: '', description: '', priority: 3, due_date: '' });
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            await api.post(`/api/tasks/${id}/toggle_complete/`);
            fetchTasks();
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
        try {
            await api.delete(`/api/tasks/${id}/`);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                        {greeting} <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
                        Tienes <span className="font-semibold text-primary-600 dark:text-primary-400">{tasks.filter(t => !t.is_complete).length} tareas</span> pendientes para hoy.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => setShowForm(!showForm)} className="shadow-xl shadow-primary-500/20">
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Nueva Tarea</span>
                        <span className="sm:hidden">Nueva</span>
                    </Button>
                </div>
            </div>

            {showForm && (
                <div className="glass-panel p-6 rounded-2xl mb-10 animate-fade-in relative">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Crear nueva tarea</h3>
                    <form onSubmit={handleCreateTask} className="grid gap-6">
                        <Input
                            label="Título"
                            placeholder="¿Qué necesitas hacer?"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                            autoFocus
                        />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Descripción</label>
                            <textarea
                                placeholder="Añade los detalles..."
                                className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none resize-none h-32 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-200"
                                value={newTask.description}
                                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Prioridad</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-gray-900 dark:text-white appearance-none cursor-pointer transition-all duration-200"
                                        value={newTask.priority}
                                        onChange={e => setNewTask({ ...newTask, priority: parseInt(e.target.value) })}
                                    >
                                        <option value={1}>Alta</option>
                                        <option value={2}>Media</option>
                                        <option value={3}>Baja</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <Input
                                type="date"
                                label="Fecha límite"
                                value={newTask.due_date || ''}
                                onChange={e => setNewTask({ ...newTask, due_date: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancelar</Button>
                            <Button type="submit">Guardar Tarea</Button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-20 glass-panel rounded-2xl border-dashed border-2 border-gray-300 dark:border-gray-700">
                    <div className="bg-primary-50 dark:bg-primary-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Todo limpio por aquí</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">No tienes tareas pendientes. ¡Es un buen momento para planificar tu próxima meta!</p>

                </div>
            ) : (
                <div className="flex flex-col gap-4 pb-10 max-w-3xl mx-auto">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onToggle={handleToggleComplete}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default Dashboard;
