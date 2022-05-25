import { CSSProperties, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { DeliveryDataInfoObject } from "../data/collections/deliveryData";
import AdminPage from "../pages/AdminPage";
import AllCollections from "../pages/AllCollectionsPage";
import CheckoutPage from "../pages/CheckoutPage";
import CheckoutPageDetails from "../pages/CheckoutPageDetails";
import Collection from "../pages/CollectionPage";
import LoginPage from "../pages/LoginPage";
import PaymentPage from "../pages/PaymentPage";
import ProfilePage from "../pages/ProfilePage";
import PurchaseComplete from "../pages/PurchaseComplete";
import StartPage from "../pages/Startpage";
import CartModal from "./CartModal";
import { CartProvider } from '../context/CartContext'
import { ProductProvider } from "../context/ProductContext";
import { ShipperProvider } from "../context/ShipperContext";
import { UserProvider } from "../context/LoginContext";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  const [modalState, setModalState] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(DeliveryDataInfoObject);
  const [finalTotalSum, setFinalTotalSum] = useState<number>(1);
  
  return (
    <div>
      <CartProvider>
        <ProductProvider>
          <ShipperProvider>
            <UserProvider>
          <BrowserRouter>
            <Header
              modalState={modalState}
              setModalState={setModalState}
            />
            <CartModal modalState={modalState} setModalState={setModalState} />
            <div style={rootStyle}>
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/all" element={<AllCollections />} />
                <Route path="/collection/:id" element={<Collection />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                  path="/"
                  element={
                    <StartPage/>
                  }
                />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route
                  path="/checkoutdetails"
                  element={
                    <CheckoutPageDetails
                      deliveryInfo={deliveryInfo}
                      setDeliveryInfo={setDeliveryInfo}
                    />
                  }
                />
                <Route
                  path="/paymentpage"
                  element={
                    <PaymentPage
                      deliveryInfo={deliveryInfo}
                      setDeliveryInfo={setDeliveryInfo}
                      finalTotalSum={finalTotalSum}
                      setFinalTotalSum={setFinalTotalSum}
                    />
                  }
                />

                <Route path="/purchasecomplete" element={<PurchaseComplete deliveryInfo={deliveryInfo} finalTotalSum={finalTotalSum}/>}
                />
              </Routes>
              <Footer/>
            </div>
            <ToastContainer />
          </BrowserRouter>
          </UserProvider>
          </ShipperProvider>
        </ProductProvider>
      </CartProvider>
    </div>
  );
}

const rootStyle: CSSProperties = {
  maxWidth: "85vw",
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: "center",
  margin: "0 auto",
  marginTop: "2rem",
  color: "white",
};

export default Layout;
