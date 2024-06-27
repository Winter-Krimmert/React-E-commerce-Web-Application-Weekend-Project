import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerForm.module.css'; // Import CSS file for styling

const BASE_URL = 'http://127.0.0.1:5000/customers';

const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Fetch customer details if editing an existing customer
  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching customer:', error);
        });
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (id) {
        // Update existing customer
        await axios.put(`${BASE_URL}/${id}`, formData);
        alert(`Successfully updated customer: ${formData.name}`);
      } else {
        // Add new customer
        await axios.post(BASE_URL, formData);
        alert(`Successfully added customer: ${formData.name}`);
      }
      navigate('/customers');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">{id ? 'Edit Customer' : 'Add Customer'}</h3>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid name.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Customer' : 'Add Customer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
