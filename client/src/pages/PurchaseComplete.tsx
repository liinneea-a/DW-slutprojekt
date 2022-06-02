import { height } from "@mui/system";
import { CSSProperties } from "react";
import { Order } from "../../../server/resources";
import DeliveryInfoTableWithPay from "../components/checkoutComponents/DeliveryInfoTableWithPay";
import GenerateOrderNumber from "../components/checkoutComponents/OrderNumber";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useShipper } from "../context/ShipperContext";
import { DeliveryDataInfo } from "../data/collections/deliveryData";

function PurchaseComplete() {
  const { purchaseList, purchaseTotal, totalPrice, cart, deliveryInfo } =
    useCart();

  const { selectedShipping } = useShipper();

  return (
    <div style={purchaseCompleteContainer}>
      <h2 style={purchaseCompleteTextStyle}>Purchase complete!</h2>
      <div>
        <GenerateOrderNumber />
        <h2 style={deliveryDetailsTextStyle}>Delivery details</h2>

        <DeliveryInfoTableWithPay />
      </div>
      <div style={totalPriceContainer}>
        <h2 style={totalPriceTextStyle}>Total price: {totalPrice} SEK</h2>
      </div>
      <h2>Your purchase:</h2>
      {/* <div style={cardContainer}> */}
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
                <p>Price: {product.price} SEK</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* </div> */}
    </div>
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
  width: "auto",
};

const productCardStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "20rem",
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

const coinIcon: CSSProperties = { marginTop: "1.8rem" };

const coinIcon2: CSSProperties = { marginTop: "0.1rem" };

const purchasedItems: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  gap: "1rem",
  margin: 0,
  flexWrap: "wrap",
};

const purchasedItemTestCard: CSSProperties = {
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  background: "#303339",
  gap: "1rem",
  padding: "1rem",
  width: "clamp(12vmax, 30vmax, 5rem)",
  position: "relative",
};

const cardContainer: CSSProperties = {
  width: "100%",
  borderRadius: ".5rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "1rem",
};

const cardBody: CSSProperties = {
  width: "90%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const cardFooter: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  fontSize: "clamp(2vmin, 2.5vmin, 1.2rem)",
};
const cardHeader: CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "clamp(2vmin, 3vmin, 1.2rem)",
};

const cardHeaderTextStyle: CSSProperties = { margin: 0 };

const cardImageContainer: CSSProperties = { width: "100%" };

const cardImageStyle: CSSProperties = { width: "100%" };

const itemCountBadge: CSSProperties = {
  position: "absolute",
  top: "-.5rem",
  right: "-.5rem",
  width: "1.5rem",
  height: "1.5rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%",
  fontSize: "1rem",
  color: "white",
  background: "#2081e2",
};

const itemCountTextStyle: CSSProperties = {
  textAlign: "center",
  width: "100%",
  letterSpacing: 0,
  fontWeight: "bold",
};
