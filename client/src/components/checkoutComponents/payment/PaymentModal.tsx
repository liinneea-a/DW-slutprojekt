import { CSSProperties } from "react";

function PaymentPopup() {
  return (
    <div>
      <div style={paymentPopUp}>
        <h2 style={paymentPopUpHeadline}>Taking your money, hang on...</h2>
        <div style={spinnerContainer}>
          <img
            style={spinStyle}
            src="/assets/images/Icons/loading.svg"
            alt="Waiting for payment"
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentPopup;

const paymentPopUp: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(50vmin, 90vmin, 20rem)",
  background: "#202225",
  border: "1px solid #303339",
  borderRadius: "1rem",
  zIndex: "9001",
  boxShadow: "24",
  textAlign: "center",
};

const paymentPopUpHeadline: CSSProperties = { color: "white" };

const spinnerContainer: CSSProperties = { width: "100%" };

const spinStyle: CSSProperties = {
  width: "50%",
  fill: "white",
};
