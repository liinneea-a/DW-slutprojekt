import { CSSProperties } from "react";
import OrderTable from "./OrderTable";

function AdminOrderPage() {

  return (
    <div style={adminOrderPage}>
      <OrderTable />
    </div>
  );
}

export default AdminOrderPage;

const adminOrderPage: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: 'center',
  width:'80%'
};