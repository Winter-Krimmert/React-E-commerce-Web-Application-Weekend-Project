import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
// Import scoped styles
import styles from './CancelOrder.module.css';



const CancelOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
      navigate('/orders');
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container className={`border border-white rounded p-4 w-75 ${styles.container}`}>
      <h3>Cancel Order</h3>
      <ListGroup>
        <ListGroup.Item className={styles['list-group-item']}>Order ID: {order.id}</ListGroup.Item>
        <ListGroup.Item className={styles['list-group-item']}>Order Date: {order.order_date}</ListGroup.Item>
        <ListGroup.Item className={styles['list-group-item']}>Total Price: ${order.total_price.toFixed(2)}</ListGroup.Item>
      </ListGroup>
      <Button onClick={handleCancel} variant="outline-danger" size="sm" className={`mt-3 ${styles.button}`}>Cancel Order</Button>
    </Container>
  );
};

export default CancelOrder;
