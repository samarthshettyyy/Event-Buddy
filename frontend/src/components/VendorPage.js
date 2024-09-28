import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);
  const [rating, setRating] = useState(0);
  const [newVendor, setNewVendor] = useState({ name: '', description: '' });

  // Fetch vendor data from the backend
  useEffect(() => {
    axios.get('/api/vendors')
      .then(response => setVendors(response.data))
      .catch(error => console.log(error));
  }, []);

  // Function to handle rating submission
  const handleRatingSubmit = (vendorId) => {
    axios.post(`/api/vendors/${vendorId}/rate`, { rating })
      .then(response => {
        alert("Rating submitted!");
        // Optionally re-fetch the vendors after rating
      })
      .catch(error => console.log(error));
  };

  // Function to add a new vendor
  const handleAddVendor = () => {
    axios.post('/api/vendors', newVendor)
      .then(response => {
        alert("Vendor added!");
        setVendors([...vendors, response.data]);
        setNewVendor({ name: '', description: '' }); // Reset form fields
      })
      .catch(error => console.log(error));
  };

  // Function to remove a vendor
  const handleRemoveVendor = (vendorId) => {
    axios.delete(`/api/vendors/${vendorId}`)
      .then(response => {
        alert("Vendor removed!");
        setVendors(vendors.filter(vendor => vendor._id !== vendorId));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="vendor-page">
      <h2>Vendors</h2>

      {/* Form to add a new vendor */}
      <div className="add-vendor-form">
        <h3>Add a New Vendor</h3>
        <input
          type="text"
          placeholder="Vendor Name"
          value={newVendor.name}
          onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Vendor Description"
          value={newVendor.description}
          onChange={(e) => setNewVendor({ ...newVendor, description: e.target.value })}
        />
        <button onClick={handleAddVendor}>Add Vendor</button>
      </div>

      <div className="vendor-list">
        {vendors.map((vendor) => (
          <div key={vendor._id} className="vendor-card">
            <h3>{vendor.name}</h3>
            <p>{vendor.description}</p>
            <div className="rating">
              <label>Rate this vendor:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="0">Select rating</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value} Star{value > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRatingSubmit(vendor._id)}>Submit Rating</button>
            </div>
            {/* Button to remove vendor */}
            <button onClick={() => handleRemoveVendor(vendor._id)}>Remove Vendor</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPage;
