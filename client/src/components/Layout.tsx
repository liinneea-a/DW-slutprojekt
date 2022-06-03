import { CSSProperties, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminEditUserPage from '../pages/AdminEditUserPage';
import AdminPage from '../pages/AdminPage';
import AllProducts from '../pages/AllProductsPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutPageDetails from '../pages/CheckoutPageDetails';
import LoginPage from '../pages/LoginPage';
import { OrderPage } from '../pages/OrderPage';
import PaymentPage from '../pages/PaymentPage';
import PurchaseComplete from '../pages/PurchaseComplete';
import StartPage from '../pages/Startpage';
import CartModal from './CartModal';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  const location = useLocation();
  const [modalState, setModalState] = useState(false);
  const [finalTotalSum, setFinalTotalSum] = useState<number>(1);

  return (
    <div>
      {location.pathname === '/checkout' || location.pathname === '/checkoutdetails' || location.pathname === '/paymentpage' || location.pathname === '/purchasecomplete' ? null : (
        <Header modalState={modalState} setModalState={setModalState} />
      )}

      <CartModal modalState={modalState} setModalState={setModalState} />
      <div style={rootStyle}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminusers" element={<AdminEditUserPage />} />
          <Route path="/all" element={<AllProducts />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/checkoutdetails" element={<CheckoutPageDetails />} />
          <Route
            path="/paymentpage"
            element={
              <PaymentPage
                finalTotalSum={finalTotalSum}
                setFinalTotalSum={setFinalTotalSum}
              />
            }
          />

          <Route path="/purchasecomplete" element={<PurchaseComplete />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

const rootStyle: CSSProperties = {
  maxWidth: '85vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  marginTop: '2rem',
  color: 'white',
};

export default Layout;
