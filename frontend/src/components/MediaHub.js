import React, { useEffect, useState } from 'react';
import './MediaHub.css'; // Your CSS for styling

const MediaHub = () => {
  const [mediaEvents, setMediaEvents] = useState([]);
  const [error, setError] = useState(null);

  // Fetch media events from the backend
  useEffect(() => {
    const fetchMediaEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/media-events'); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch media events');
        }
        const data = await response.json();
        setMediaEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMediaEvents();
  }, []);

  return (
    <div className="media-hub">
      <h1>Media Hub</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="media-event-list">
        {mediaEvents.map((event) => (
          <MediaCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

const MediaCard = ({ event }) => {
  const coverImage = event.mediaContent.length > 0 ? event.mediaContent[0].fileUrl : '';

  return (
    <div className="media-card">
      <img src={coverImage} alt={event.name} className="cover-image" />
      <div className="event-info">
        <h2>{event.name}</h2>
        <p>Date: {new Date(event.date).toLocaleDateString()}</p>
        <p>Location: {event.location}</p>
      </div>
    </div>
  );
};

export default MediaHub;