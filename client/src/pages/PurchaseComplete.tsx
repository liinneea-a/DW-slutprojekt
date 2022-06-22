import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryInfoTableWithPay from "../components/checkoutComponents/DeliveryInfoTableWithPay";
import { StartPageButton } from "../components/StartPageButton";
import { useCart } from "../context/CartContext";

function PurchaseComplete() {
  const navigate = useNavigate();
  const { totalPrice, cart, id, selectedShipping } = useCart();

  return (
    <>
      <StartPageButton />
      <div style={rootStyle}>
        <div style={purchaseCompleteContainer}>
          <h2 style={purchaseCompleteTextStyle}>Purchase complete!</h2>
          <div>
            <h3>Order Nr: {id}</h3>
            <h2 style={deliveryDetailsTextStyle}>Delivery details</h2>

            <DeliveryInfoTableWithPay />
          </div>
          <div style={totalPriceContainer}>
            <h2 style={totalPriceTextStyle}>
              Total price: {totalPrice + selectedShipping.cost} SEK
            </h2>
          </div>
          <h2>Your purchase:</h2>
          <div style={purchasedItems}>
            {cart.map((product) => {
              return (
                <div key={product.id} style={productCardStyle}>
                  <img
                    srcSet={product.imageId}
                    style={productImageStyle}
                    alt="product image"
                  />
                  <div style={{ marginRight: "1rem" }}>
                    <p>{product.name}</p>
                    <p>Sek: {product.price} kr</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseComplete;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
};

const productImageStyle: CSSProperties = {
  objectFit: "cover",
  height: "100%",
  maxHeight: '15vh',
  width: "auto",
};

const productCardStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: 'center',
  gap: '1rem',
  height: "10rem",
  border: "1px solid grey",
};

const purchaseCompleteContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  background: "#202225",
  marginBottom: "2rem",
};

const purchaseCompleteTextStyle: CSSProperties = {
  fontSize: "2rem",
  textAlign: "center",
};

const deliveryDetailsTextStyle: CSSProperties = {
  textAlign: "center",
  marginTop: "0",
};

const totalPriceContainer: CSSProperties = { display: "flex" };

const totalPriceTextStyle: CSSProperties = { marginRight: ".1rem" };

const purchasedItems: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  gap: "1rem",
  margin: 0,
  flexWrap: "wrap",
};