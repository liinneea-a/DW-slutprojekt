import { Button } from "@mui/material";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { DeliveryDataInfo } from "../../../../data/collections/deliveryData";
import { useCart } from "../../../context/CartContext";

interface Props {
  deliveryInfo: DeliveryDataInfo;
  setDeliveryInfo: any;
}

function Invoice(props: Props) {
  const navigate = useNavigate();
  const { addPurchaseList, cart, clearCart, totalPrice, newPurchaseTotal } =
    useCart();
  const completePayment = (props: Props) => {
    let newObject = props.deliveryInfo;
    newObject.paymentMethod = "Card";
    props.setDeliveryInfo(newObject);
    addPurchaseList(cart);
    newPurchaseTotal(totalPrice);
    clearCart();
    navigate("/PurchaseComplete");
  };
  return (
    <div style={invoiceInfoBox}>
      <p>
        When choosing invoice as the payment option, the invoice will be sent
        together with your order to your chosen delivery address.
      </p>
      <Button
        style={completePurchaseButton}
        color="primary"
        variant="contained"
        fullWidth
        onClick={() => completePayment(props)}
      >
        Complete purchase
      </Button>
    </div>
  );
}

export default Invoice;

const invoiceInfoBox: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  width: "clamp(5rem, 60vmin, 20rem)",
};

const completePurchaseButton: CSSProperties = {
  marginTop: "1rem",
  marginBottom: "1rem",
  width: "70%",
};
