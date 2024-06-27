import React, { useState, useEffect } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './CustomerAccountDetail.module.css'; // Import CSS module

const CustomerAccountDetail = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:5000/customers/${customerId}`);
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <Container className={styles.container}>
      <h2>Customer Accounts</h2>
      {customers.map((customer) => (
        <Card key={customer.id} className={styles.card}>
          <Card.Body>
            <Card.Title>{customer.name}</Card.Title>
            <Card.Text>Email: {customer.email}</Card.Text>
            <Card.Text>Phone: {customer.phone}</Card.Text>
            <Link to={`/customers/${customer.id}`} className="btn btn-primary">
              View Details
            </Link>
            <Button variant="danger" onClick={() => handleDeleteCustomer(customer.id)} className="mx-2">
              Delete
            </Button>
            {/* Example: Implement Edit button here */}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default CustomerAccountDetail;
