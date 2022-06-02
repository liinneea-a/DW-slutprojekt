import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { ShipperProvider } from './context/ShipperContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <ProductProvider>
          <ShipperProvider>
            <UserProvider>
              <OrderProvider>
                <BrowserRouter>
                  <Layout />
                </BrowserRouter>
              </OrderProvider>
            </UserProvider>
          </ShipperProvider>
        </ProductProvider>
      </CartProvider>
    </div>
  );
}

export default App;
