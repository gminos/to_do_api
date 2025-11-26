import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';
import TaskCard from '../components/TaskCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { Plus, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const [newTask, setNewTask] = useState({ title: '', description: '', priority: 3, due_date: '' });

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
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mis Tareas</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Organiza tu día, alcanza tus metas.</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-5 h-5" />
                    Nueva Tarea
                </Button>
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Crear nueva tarea</h3>
                    <form onSubmit={handleCreateTask} className="grid gap-4">
                        <Input
                            placeholder="Título de la tarea"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            required
                            autoFocus
                        />
                        <textarea
                            placeholder="Descripción (opcional)"
                            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prioridad</label>
                                <select
                                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                    value={newTask.priority}
                                    onChange={e => setNewTask({ ...newTask, priority: parseInt(e.target.value) })}
                                >
                                    <option value={1}>Alta</option>
                                    <option value={2}>Media</option>
                                    <option value={3}>Baja</option>
                                </select>
                            </div>
                            <Input
                                type="date"
                                label="Fecha límite"
                                value={newTask.due_date || ''}
                                onChange={e => setNewTask({ ...newTask, due_date: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
                            <Button type="submit">Guardar Tarea</Button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                </div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">No tienes tareas pendientes.</p>
                    <Button variant="ghost" onClick={() => setShowForm(true)}>¡Crea la primera!</Button>
                </div>
            ) : (
                <div className="grid gap-4">
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
