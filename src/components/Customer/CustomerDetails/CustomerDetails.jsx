import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CustomerDetails = () => {
  const { id } = useParams(); // Extract the customer ID from the URL parameters
  const [customer, setCustomer] = useState(null); // State to hold the customer data
  const [error, setError] = useState(null); // State to hold any errors

  useEffect(() => {
    // Fetch the customer data from the API
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        setCustomer(response.data); // Update state with the fetched customer data
      } catch (error) {
        setError('Error fetching customer details'); // Update state with the error
      }
    };

    fetchCustomer(); // Invoke the function to fetch customer data
  }, [id]); // Dependency array ensures this effect runs when the ID changes

  if (error) return <p>{error}</p>; // Display error message if there was an error fetching data
  if (!customer) return <p>Loading customer details...</p>; // Show loading message if customer data is not yet loaded

  // Render the customer details
  return (
    <div>
      <h3>Customer Details</h3>
      <p><strong>Name:</strong> {customer.name}</p>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;
