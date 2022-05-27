import { CSSProperties } from "react";
import OrderTable from "./OrderTable";

function AdminOrderPage() {

  return (
    <div style={loginPageLayout}>
      <OrderTable />
    </div>
  );
}

export default AdminOrderPage;

const loginPageLayout: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  textAlign: 'center'
};

const tempFormLayout: CSSProperties = {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap"
};
