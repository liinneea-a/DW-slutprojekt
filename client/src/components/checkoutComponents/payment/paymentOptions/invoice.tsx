import { CSSProperties } from "react";
import { CompleteButton } from "../../../CompleteButton";



function Invoice() {

  return (
    <div style={invoiceInfoBox}>
      <p>
        When choosing invoice as the payment option, the invoice will be sent
        together with your order to your chosen delivery address.
      </p>
        <CompleteButton paymentMethod={"invoice"} />
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
  paddingBottom: '1rem'
};

const completePurchaseButton: CSSProperties = {
  marginTop: "1rem",
  marginBottom: "1rem",
  width: "70%",
};
