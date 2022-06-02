import { CSSProperties } from "react";
import { useCart } from "../../../context/CartContext";
import { useShipper } from "../../../context/ShipperContext";

function TotalSumWithShipping() {
  const { totalPrice, selectedShipping } = useCart();
  // const { selectedShipping } = useShipper();

  
  
  return (
    <div>
      <div style={totalPriceContainer}>
        <p style={totalPriceText}>Total price with shipping:</p>
        <p style={totalPriceTextTwo}>{ totalPrice + selectedShipping!.cost } SEK</p>
      </div>
    </div>
  );
}

export default TotalSumWithShipping;

const totalPriceContainer: CSSProperties = {
  display: "flex",
  flexDirection: 'column',
  justifyContent: "center",
  alignItems: "center",
};

const totalPriceText: CSSProperties = {
  fontSize: "1.2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
};
const totalPriceTextTwo: CSSProperties = {
  fontSize: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  textAlign: "center",
  fontWeight: 'bold',
  margin: 0,
};
