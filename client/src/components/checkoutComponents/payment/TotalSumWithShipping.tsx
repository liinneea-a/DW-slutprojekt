import { CSSProperties } from "react";
import { useCart } from "../../../context/CartContext";
import { useShipper } from "../../../context/ShipperContext";
import { DeliveryDataInfo } from "../../../data/collections/deliveryData";




function TotalSumWithShipping() {
  const {  totalPrice  } = useCart();
  const { selectedShipping } = useShipper();

console.log(selectedShipping.cost)


  return (
    <div>
      <div style={totalPriceContainer}>
          <p style={totalPriceText}>
           Total price with shipping:  { totalPrice + selectedShipping.cost } SEK
          </p>
      </div>
    </div>
  );
}

export default TotalSumWithShipping;

const totalPriceContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const totalPriceText: CSSProperties = {
  marginRight: ".1rem",
  fontSize: "1.2rem",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
};
