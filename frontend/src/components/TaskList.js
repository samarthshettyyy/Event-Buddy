import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';

// Mock team members
const teamMembers = [
  { id: '1', name: 'Alice Johnson' },
  { id: '2', name: 'Bob Smith' },
  { id: '3', name: 'Charlie Brown' },
];

export default function TaskAssignment({ eventId }) {  // Pass eventId as a prop
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    dueDate: '',
    status: 'todo',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${eventId}`);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError('Failed to fetch tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [eventId]);

  // Handle input change for new task
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      setError('Please fill in all fields');
      return;
    }

    try {
        console.warn(newTask);
      const response = await fetch('http://localhost:5000/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          eventId, // Include eventId in the task creation
        }),
      });
      
      const data = await response.json();
      setTasks((prev) => [...prev, data]); // Add new task to the state
      setNewTask({ title: '', assignee: '', dueDate: '', status: 'todo' });
      setError(null);
    } catch (error) {
      setError('Failed to add task');
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/delete-task/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  // Update task status
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/update-task/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
    } catch (error) {
      setError('Failed to update task');
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading tasks...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task Assignment</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleAddTask} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assignee" className="block text-gray-700 text-sm font-bold mb-2">
            Assignee
          </label>
          <select
            id="assignee"
            name="assignee"
            value={newTask.assignee}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select an assignee</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-gray-700 text-sm font-bold mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Task
          </button>
        </div>
      </form>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-bold mb-4">Task List</h3>
        {tasks.length === 0 ? (
          <p>No tasks assigned yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-500">
                      Assigned to: {teamMembers.find((m) => m.id === task.assignee)?.name}
                    </p>
                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className="mr-2 shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label="Delete task"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
