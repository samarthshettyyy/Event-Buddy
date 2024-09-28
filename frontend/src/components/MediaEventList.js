import React from 'react';
import './MediaEventList.css'; // Include CSS file for styling

const MediaEventList = ({ event }) => {
    return (
        <div className="media-card">
            <div className="media-card-image">
                {event.mediaContent.length > 0 ? (
                    <img 
                        src={event.mediaContent[0].fileUrl} 
                        alt={`${event.name} Cover`} 
                        className="media-cover-img" 
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="media-card-info">
                <h3>{event.name}</h3>
                <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                <p>Location: {event.location}</p>
            </div>
        </div>
    );
}

export default MediaEventList;
