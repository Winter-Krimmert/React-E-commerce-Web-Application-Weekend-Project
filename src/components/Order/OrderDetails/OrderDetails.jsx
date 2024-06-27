import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import OrderList from '../OrderList/OrderList';
import styles from './OrderDetails.module.css'; // Import CSS module

const OrderDetails = () => {
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
    <Container className={`${styles['order-details-container']} border border-white rounded p-4`}>
      <h3 className={styles['order-details-header']}>Order Details</h3>
      <ListGroup>
        <Container className="mb-3">
          <ListGroup.Item className={`${styles['order-details-item']} li rounded border mb-2`}>Order ID: {order.id}</ListGroup.Item>
          <ListGroup.Item className={`${styles['order-details-item']} li rounded border mb-2`}>Order Date: {order.order_date}</ListGroup.Item>
          <ListGroup.Item className={`${styles['order-details-item']} li rounded border mb-2`}>Customer ID: {order.customer_id}</ListGroup.Item>
          <ListGroup.Item className={`${styles['order-details-item']} li rounded border mb-2`}>Products: {order.products.join(', ')}</ListGroup.Item>
          <ListGroup.Item className={`${styles['order-details-item']} li rounded border mb-2`}>Total Price: ${order.total_price.toFixed(2)}</ListGroup.Item>
        </Container>
      </ListGroup>
      <Button onClick={handleCancel} variant="outline-danger" className={`mt-3 ${styles['cancel-button']}`}>Cancel Order</Button>
      <OrderList customerId={order.customer_id} />
    </Container>
  );
};

export default OrderDetails;
