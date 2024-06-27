import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/products';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch product details if editing an existing product
  useEffect(() => {
    if (id) {
      axios.get(`${BASE_URL}/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
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
        // Update existing product
        await axios.put(`${BASE_URL}/${id}`, formData);
        alert(`Successfully updated product: ${formData.name}`);
      } else {
        // Add new product
        await axios.post(BASE_URL, formData);
        alert(`Successfully added product: ${formData.name}`);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 className="form-title">{id ? 'Edit Product' : 'Add Product'}</h3>
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
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
            <div className="invalid-feedback">
              Please enter a valid price.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Product' : 'Add Product'}
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProductForm;
