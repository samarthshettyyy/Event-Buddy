import React, { useState } from 'react';
import './MediaUpload.css'; // Add your CSS for styling
import { useParams } from 'react-router-dom';

const MediaUpload = () => {
  const { eventId } = useParams(); // Retrieve eventId from route parameters
  const [mediaFiles, setMediaFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  console.warn("Event ID:", eventId); // Debugging line

  // Handle file selection and preview
  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);

    // Generate preview URLs for images/videos
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewFiles((prevPreviews) => [...prevPreviews, ...previews]);
  };

  // Handle form submission to upload media
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('eventId', eventId); // Use eventId from useParams

    // Append all selected media files to formData
    for (let i = 0; i < mediaFiles.length; i++) {
      formData.append('mediaContent', mediaFiles[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/upload-media', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.warn(data);
      if (response.ok) {
        setMessage('Media uploaded successfully!');
        setMediaFiles([]); // Reset files after upload
        setPreviewFiles([]); // Clear preview
      } else {
        setError(data.error || 'Failed to upload media');
      }
    } catch (err) {
      setError('Failed to upload media');
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1>Upload Media for Event</h1>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFilesChange}
          />

          {/* Display list of selected files for preview */}
          {previewFiles.length > 0 && (
            <div className="preview-container">
              <h4>Preview</h4>
              <div className="preview-list">
                {previewFiles.map((file, index) => (
                  <div key={index} className="preview-item">
                    {mediaFiles[index] && mediaFiles[index].type.startsWith('image/') ? (
                      <img src={file} alt={`media-${index}`} className="preview-image" />
                    ) : (
                      <video className="preview-video" controls>
                        <source src={file} type="video/mp4" />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="upload-button">Upload Media</button>
        </form>
      </div>
    </div>
  );
};

export default MediaUpload;
