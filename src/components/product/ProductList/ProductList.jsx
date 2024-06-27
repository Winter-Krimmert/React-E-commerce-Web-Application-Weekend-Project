import { useState, useEffect } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 
import OrderList from '../../Order/OrderList/OrderList';
import styles from './ProductList.module.css'; // Import CSS module styles



function ProductList() {
  const navigate = useNavigate(); 
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    // Fetch products from API when component mounts
    async function fetchProducts() {
      try {
        const response = await axios.get("http://127.0.0.1:5000/products");
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs once

  // Handle selection of product ID
  function handleProductId(id) {
    setSelectedProductId(id);
  }

  // Example function to delete a product
  async function handleDeleteProduct(id) {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/products/${id}`);
      console.log(response);

      let updatedProducts = [...products];
      updatedProducts = updatedProducts.filter(product => product.product_id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  return (
    <Container className={`${styles.container} border border-white rounded p-4 w-75`}>
      <h3>Products</h3>
      <ListGroup>
      {products.map(product => (
          <Container key={product.product_id} className={`${styles.listItem} mb-3`}>
            <ListGroup.Item onClick={() => handleProductId(product.product_id)} className="li rounded border mb-2">
              <Link to={`/products/${product.product_id}`}>{product.name}</Link>
            </ListGroup.Item>
            <div className={styles.buttonContainer}>
              <Button onClick={() => navigate(`/products/edit/${product.product_id}`)} variant="outline-info" size="sm" className={styles.button}>Edit</Button>
              <Button onClick={() => handleDeleteProduct(product.product_id)} variant="outline-danger" size="sm" className={`${styles.button} ms-2`}>Delete</Button>
            </div>
          </Container>
        ))}
      </ListGroup>
      {selectedProductId && <OrderList productId={selectedProductId} />} {/* Example of passing selectedProductId to OrderList */}
    </Container>
  );
}

export default ProductList;
