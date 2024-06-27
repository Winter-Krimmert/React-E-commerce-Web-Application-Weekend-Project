import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; // Import CSS module

const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Navbar.Brand as={Link} to="/" className={styles['navbar-brand']}>
        Ecommerce App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`${styles['navbar-nav']} me-auto`}>
          <NavDropdown title="Customers" id="customers-dropdown" className={styles['nav-item']}>
            <NavDropdown.Item as={Link} to="/customers" className={styles['nav-link']}>
              View All Customers
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/customers/add" className={styles['nav-link']}>
              Add Customer
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/customer_accounts" className={styles['nav-link']}>
              View Customer Accounts
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Orders" id="orders-dropdown" className={styles['nav-item']}>
            <NavDropdown.Item as={Link} to="/orders" className={styles['nav-link']}>
              View All Orders
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/orders/create" className={styles['nav-link']}>
              Add Order
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Products" id="products-dropdown" className={styles['nav-item']}>
            <NavDropdown.Item as={Link} to="/products" className={styles['nav-link']}>
              View All Products
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/products/add" className={styles['nav-link']}>
              Add Product
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
