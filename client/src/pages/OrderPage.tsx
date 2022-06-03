import { CSSProperties } from "react";
import OrderTable from "./OrderTable";

export function OrderPage() {

  return (
    <div style={OrderPageStyle}>
      <OrderTable />
    </div>
  );
}


const OrderPageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: 'center',
  width:'80%'
};