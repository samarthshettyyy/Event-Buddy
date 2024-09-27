import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Ensure tasks is an array
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    dueDate: '',
    status: 'todo',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Event ID from params
  const [searchResults, setSearchResults] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search-email/${key}`);
      result = await result.json();
      if (result) {
        setSearchResults(result); // Store search results
      }
    } else {
      setSearchResults([]); // Clear results if no input
    }
  };

  // Handle selection of email
  const handleSelectEmail = (email) => {
    setSelectedEmail(email); // Set selected email
    setSearchResults([]); // Clear search results after selection
    setNewTask((prev) => ({ ...prev, assignee: email })); // Assign email to newTask assignee
  };

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await response.json();
        console.log(data); // Ensure data is correct

        if (Array.isArray(data)) {
          setTasks(data); // Set the tasks data
        } else {
          setTasks([]); // Default to empty array if something is wrong
        }
      } catch (error) {
        setError('Failed to fetch tasks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

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
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          eventId: id, // Pass the eventId in the task creation
        }),
      });
      const data = await response.json();
      setTasks((prev) => [...prev, data]); // Add the new task to the list
      setNewTask({ title: '', assignee: '', dueDate: '', status: 'todo' });
      setError(null);
    } catch (error) {
      setError('Failed to add task');
    }
  };

  // Delete task
  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
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
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
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
    return <div>Loading tasks...</div>;
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
          <div>
            <label>Assign to:</label>
            <input
              type="text"
              onChange={searchHandle}
              placeholder="Search by email..."
              value={selectedEmail}
            />
            {/* Render search results */}
            {searchResults.length > 0 && (
              <ul>
                {searchResults.map((user) => (
                  <li key={user._id} onClick={() => handleSelectEmail(user.email)}>
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
              <li key={task._id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-500">
                      Assigned to: {task.assignee}
                    </p>
                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                  </div>
                  <div className="flex items-center">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task._id, e.target.value)}
                      className="mr-2 shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      <TrashIcon className="w-4 h-4" />
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
};

export default TaskList;
