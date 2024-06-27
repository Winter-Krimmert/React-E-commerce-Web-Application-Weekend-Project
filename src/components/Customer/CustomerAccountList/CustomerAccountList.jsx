import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

const CustomerAccountList = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);

  useEffect(() => {
    async function fetchCustomerAccounts() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/customer_account');
        setCustomerAccounts(response.data);
      } catch (error) {
        console.error('Error fetching customer accounts:', error);
      }
    }
    fetchCustomerAccounts();
  }, []);

  return (
    <Container>
      <h3>All Customer Accounts</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map(account => (
            <tr key={account.account_id}>
              <td>{account.customer_id}</td>
              <td>{account.username}</td>
              <td>{account.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomerAccountList;
