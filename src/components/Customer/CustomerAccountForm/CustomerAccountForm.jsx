import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerAccountForm = () => {
  const { customerId } = useParams(); // Extract customerId from URL

  const [accountData, setAccountData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData({ ...accountData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/customer_account', {
        username: accountData.username,
        password: accountData.password,
        customer_id: customerId
      });
      console.log('Customer account created successfully:', response.data);
      // Optionally, handle success scenario (e.g., show a success message)
    } catch (error) {
      console.error('Error creating customer account:', error);
      // Optionally, handle error scenario (e.g., show an error message)
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h3>Add Customer Account</h3>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={accountData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={accountData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Container>
  );
};

export default CustomerAccountForm;
