import { CSSProperties } from "react";

function GenerateOrderNumber() {
  const maxNumber = 420;
  const orderNumber = Math.floor(Math.random() * maxNumber + 1);
  return (
    <div>
      <h2 style={orderNumberTextStyle}>Order id: #{orderNumber}</h2>
    </div>
  );
}

export default GenerateOrderNumber;

const orderNumberTextStyle: CSSProperties = { textAlign: "center" };
