import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Myevents.css';

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user info from localStorage
        const userId = user._id; // Assume that user object has _id field
        const userEmail = user.email;
        console.warn(userId);

        if (!userId) {
          console.error('No user ID found in localStorage');
          return;
        }

        //const response = await fetch(`http://localhost:5000/my-events/${userId}`);
        //const data = await response.json();

        // try {
        //   const response = await fetch(`http://localhost:5000/my-events/${userId}`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ email: userEmail }), // Pass the email in the request body
        //   });
        //   const data = await response.json();
        //   console.log(data); // Check if data is coming correctly
        // } catch (error) {
        //   console.error('Error fetching events:', error);
        // }

        const response = await fetch(`http://localhost:5000/my-events/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }), // Pass the email in the request body
        });
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
    <div className="background-container">
      <div className="background-blur"></div> {/* The blurred background */}
      <div className="myevents-content"> {/* Your card content */}
        <h1>My Events</h1>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map((item) => (
              <li key={item._id} className="myevent">
              <h3>{item.name}</h3>
              <p>Type: {item.type}</p>
              <p>Date: {new Date(item.date).toLocaleDateString()}</p>
              <p>Time: {item.time}</p>
              <p>Location: {item.location}</p>
              <p>Description: {item.description}</p>
              
              <div className="button-container">
                <Link to={"/budget-tracking/" + item._id}>
                  <button className="btn">$</button>
                </Link>
                <Link to={"/update/" + item._id}>
                  <button className="btn">Edit</button>
                </Link>
                <Link to={"/tasks/" + item._id}>
                  <button className="btn">Task</button>
                </Link>
                <Link to={"/upload-media/" + item._id}>
                  <button className="btn">Media</button>
                </Link>
              </div>
            </li>
            
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
