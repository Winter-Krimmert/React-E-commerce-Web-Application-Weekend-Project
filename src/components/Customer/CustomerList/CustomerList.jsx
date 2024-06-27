import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import styles from './CustomerList.module.css'; // Import CSS module

function CustomerList() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    }
    fetchCustomers();
  }, []);

  async function handleDeleteCustomer(id) {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${id}`);
      const updatedCustomers = customers.filter(customer => customer.customer_id !== id);
      setCustomers(updatedCustomers);
    } catch (error) {
      console.error('Error deleting customer:', error);
      if (error.response && error.response.status === 404) {
        alert('Customer not found');
      } else {
        alert('An error occurred while deleting the customer');
      }
    }
  }

  return (
    <Container>
      <h1 className={styles['customer-list']}>Customer List</h1>
      <ListGroup className={styles['customer-list']}>
        {customers.map(customer => (
          <div key={customer.customer_id}>
            <ListGroup.Item>
              <Link to={`/customers/${customer.customer_id}`}>{customer.name}</Link>
            </ListGroup.Item>
            <button className={styles.button} onClick={() => navigate(`/customers/edit/${customer.customer_id}`)}>
              Edit
            </button>
            <button className={styles.button} onClick={() => handleDeleteCustomer(customer.customer_id)}>
              Delete
            </button>
            <button className={styles.button} onClick={() => navigate(`/customer_account/add/${customer.customer_id}`)}>
              Add Customer Account
            </button>
          </div>
        ))}
      </ListGroup>
    </Container>
  );
}

export default CustomerList;
