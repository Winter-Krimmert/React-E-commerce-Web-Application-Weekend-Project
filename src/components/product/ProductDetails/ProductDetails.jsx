import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL params
  const [product, setProduct] = useState(null); // State to hold the product data
  const [error, setError] = useState(null); // State to hold any error messages

  // Fetch product data from the API when component mounts or when ID changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Make GET request to fetch product details based on ID
        const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
        setProduct(response.data); // Update state with fetched product data
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product details'); // Update state with error message if fetch fails
      }
    };

    fetchProduct(); // Invoke the fetch function
  }, [id]); // Dependency array ensures useEffect runs when ID changes

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If product is still loading, display a loading message
  if (!product) {
    return <div>Loading...</div>;
  }

  // Render the product details including the product ID
  return (
    <div>
      <h3>Product Details</h3>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p>ID: {product.product_id}</p>
    </div>
  );
};

export default ProductDetails;
