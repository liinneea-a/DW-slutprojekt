import { Button } from "@mui/material";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Props {
  paymentMethod: string;
}

export const CompleteButton = (props: Props) => {
  const { sendOrder } = useCart();
  const { deliveryInfo, setDeliveryInfo } = useCart();
  const navigate = useNavigate();

  const completePayment = () => {
    let newOrder = deliveryInfo;
    newOrder.paymentMethod = props.paymentMethod;
    setDeliveryInfo(newOrder);
    sendOrder();
    navigate("/purchasecomplete");
  };

  return (
    <Button
      variant="contained"
      style={completePurchaseButton}
      aria-label="outlined primary button"
      onClick={() => completePayment()}
    >
      Complete purchase
    </Button>
  );
};

const completePurchaseButton: CSSProperties = {
  width: "10rem",
  height: '100%',
  fontWeight: 'bold',
};
