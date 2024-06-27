import React, { useState } from 'react';
import axios from 'axios';
import styles from './PlaceOrderForm.module.css'; // Import CSS module styles

const PlaceOrderForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [orderDate, setOrderDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/orders', {
                customer_id: Number(customerId),
                date: orderDate
            });
            console.log('Order placed successfully:', response.data);
            // Optionally, you can redirect or perform other actions after successful order placement
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Place Order</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Customer ID:
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                        className={styles.formInput} // Apply CSS class from module
                    />
                </label>
                <br />
                <label>
                    Order Date:
                    <input
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        required
                        className={styles.formInput} // Apply CSS class from module
                    />
                </label>
                <br />
                <button type="submit" className={styles.submitButton}>Place Order</button> {/* Apply CSS class from module */}
            </form>
        </div>
    );
};

export default PlaceOrderForm;
