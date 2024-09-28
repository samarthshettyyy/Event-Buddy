import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calender.css'; // Import CSS for calendar styling
import { useParams } from 'react-router-dom';

const TaskCalendar = () => {
  const { id } = useParams(); // Get eventId from route params
  const [tasks, setTasks] = useState([]); // State to manage tasks
  const [events, setEvents] = useState([]); // State to manage calendar events
  const [error, setError] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setTasks(data); // Set the tasks data
        } else {
          setTasks([]); // Default to empty array if the data is invalid
        }
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [id]); // Re-run the effect when eventId changes

  // Function to map task status and due date to color
  const getTaskColor = (task) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const isOverdue = new Date(task.dueDate) < new Date(currentDate);

    if (isOverdue || task.status === 'pending') {
      return '#ff6347'; // Red for overdue or pending tasks
    } else if (task.status === 'in-progress') {
      return '#ffc107'; // Yellow for tasks in progress
    } else if (task.status === 'todo') {
      return '#3788d8'; // Blue for 'todo' tasks
    } else {
      return '#28a745'; // Green for completed tasks
    }
  };

  // Convert tasks to events for the calendar
  useEffect(() => {
    if (tasks.length > 0) {
      const taskEvents = tasks.map((task) => ({
        title: task.title,
        start: task.dueDate, // Set due date as the start date of the event
        allDay: true,
        backgroundColor: getTaskColor(task), // Set color based on task status
      }));

      setEvents(taskEvents); // Update the events in the calendar
    }
  }, [tasks]);

  return (
    <div className="calendar-container">
      <h1>Task Calendar</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        selectable={true} // Allows selecting dates
        events={events} // Render the events from state
      />
    </div>
  );
};

export default TaskCalendar;
