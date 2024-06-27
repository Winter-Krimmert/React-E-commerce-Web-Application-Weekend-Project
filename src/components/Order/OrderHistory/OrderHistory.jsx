import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/orders');
                setOrderHistory(response.data);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };
        fetchOrderHistory();
    }, []);

    return (
        <div className={styles['order-history']}>
            <h2>Order History</h2>
            <ul>
                {orderHistory.map((order) => (
                    <li key={order.order_id}>
                        Order ID: {order.order_id}, Customer ID: {order.customer_id}, Date: {order.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
