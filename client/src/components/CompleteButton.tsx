import { Button } from "@mui/material"
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useShipper } from "../context/ShipperContext";

interface Props {
  paymentMethod: string
}

export const CompleteButton = (props: Props) => {

    const { sendOrder } = useCart();
    const { deliveryInfo, setDeliveryInfo } = useCart(); 
    const navigate = useNavigate();

    const completePayment = () => {
     
        let newOrder = deliveryInfo;
        newOrder.paymentMethod = props.paymentMethod;
        console.log(props.paymentMethod);
        console.log(newOrder);
        setDeliveryInfo(newOrder);
        sendOrder();
        navigate("/purchasecomplete");
      };

    return (
        <div
            style={completePurchaseButton}
            onClick={() => completePayment()}
      >
        Complete purchase
      </div>
    )
}

const completePurchaseButton: CSSProperties = {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "70%",
  };