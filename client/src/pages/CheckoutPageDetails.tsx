import { CSSProperties } from "react";
import CheckoutForm from "../components/forms/CheckoutForm";
import { StartPageButton } from "../components/StartPageButton";
import { useCart } from "../context/CartContext";
import { DeliveryDataInfo } from "../data/collections/deliveryData";

function CheckoutPageDetails() {
  return (
    <>
    <StartPageButton />
      <div style={checkoutContainer}>
        <h2 style={headlineStyle}>Checkout</h2>
        <CheckoutForm />
      </div>
      </>
  );
}

export default CheckoutPageDetails;

const headlineStyle: CSSProperties = {
  fontSize: "2rem",
};

const checkoutContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#303339",
  boxShadow: "2px 5px 12px black",
  marginBottom: "2rem",
  maxWidth: '60rem'
};
