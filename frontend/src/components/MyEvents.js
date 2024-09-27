import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info from localStorage
        const userId = user._id; // Assume that user object has _id field
        console.warn(userId);

        if (!userId) {
          console.error('No user ID found in localStorage');
          return;
        }

        const response = await fetch(`http://localhost:5000/my-events/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setEvents(data); // Set the fetched data to events state
          console.warn(data); // Log the fetched events
        } else {
          console.error('Failed to fetch events:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((item) => (
            <li key={item._id}>
              <h3>{item.name}</h3>
              <p>Type: {item.type}</p>
              <p>Date: {new Date(item.date).toLocaleDateString()}</p>
              <p>Time: {item.time}</p>
              <p>Location: {item.location}</p>
              <p>Description: {item.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEvents;
