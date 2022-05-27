import { Button } from "@mui/material"
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useShipper } from "../context/ShipperContext";



export const CompleteButton = (paymentMethod: any) => {

    const { sendOrder, cart, clearCart } = useCart();
    const { deliveryInfo, setDeliveryInfo } = useCart(); 
    const { selectedShipping } = useShipper();
    const navigate = useNavigate();

    const completePayment = () => {
        let newOrder = deliveryInfo;
        newOrder.paymentMethod = paymentMethod;
        setDeliveryInfo(newOrder);
        sendOrder();
        navigate("/purchasecomplete");
      };

    return (
        <Button
            style={completePurchaseButton}
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => completePayment()}
      >
        Complete purchase
      </Button>
    )
}

const completePurchaseButton: CSSProperties = {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "70%",
  };