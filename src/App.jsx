import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import CustomerList from './components/Customer/CustomerList/CustomerList';
import CustomerDetails from './components/Customer/CustomerDetails/CustomerDetails';
import CustomerForm from './components/Customer/CustomerForm/CustomerForm';
import CustomerAccountForm from './components/Customer/CustomerAccountForm/CustomerAccountForm';
import CustomerAccountList from './components/Customer/CustomerAccountList/CustomerAccountList';
import CustomerAccountDetail from './components/Customer/CustomerAccountDetail/CustomerAccountDetail';
import ProductList from './components/product/ProductList/ProductList';
import ProductDetails from './components/product/ProductDetails/ProductDetails';
import ProductForm from './components/product/ProductForm/ProductForm';
import PlaceOrderForm from './components/Order/PlaceOrderForm/PlaceOrderForm';
import OrderDetails from './components/Order/OrderDetails/OrderDetails';
import OrderHistory from './components/Order/OrderHistory/OrderHistory';
import CancelOrder from './components/Order/CancelOrder/CancelOrder';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />
          <Route path="/customers/add" element={<CustomerForm />} />
          <Route path="/customers/edit/:id" element={<CustomerForm /> } />
          <Route path="/customer_account/add/:customerId" element={<CustomerAccountForm />} />
          <Route path="/customer_accounts" element={<CustomerAccountList />} />
          <Route path="/customer_accounts/:id" element={<CustomerAccountDetail />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/edit/:id" element={<ProductForm />} />
          <Route path="/products/add" element={<ProductForm />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/create" element={<PlaceOrderForm />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/orders/:id/cancel" element={<CancelOrder />} />
          <Route path="*" element={<NotFound />} /> {/* Use NotFound component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
