import { CSSProperties } from "react";
import GenerateOrderNumber from "../components/checkoutComponents/OrderNumber";
import { useCart } from "../context/CartContext";
import { useShipper } from "../context/ShipperContext";

function PurchaseComplete() {
  const { purchaseList, purchaseTotal, totalPrice, cart } = useCart();
  const { selectedShipping } = useShipper();
  // const { products } = useProducts();

  let totalSumWithShipping = 0;

  // if (props.deliveryInfo.deliveryMethod === "DHL agent") {
  //   totalSumWithShipping = purchaseTotal + 2;
  // } else if (props.deliveryInfo.deliveryMethod === "DHL express") {
  //   totalSumWithShipping = purchaseTotal + 6;
  // } else if (props.deliveryInfo.deliveryMethod === "Postnord home delivery") {
  //   totalSumWithShipping = purchaseTotal + 4;
  // }

  return (
    <div style={purchaseCompleteContainer}>
      <h2 style={purchaseCompleteTextStyle}>Purchase complete!</h2>
      <div>
        <GenerateOrderNumber />
        <h2 style={deliveryDetailsTextStyle}>Delivery details</h2>

        {/* <DeliveryInfoTableWithPay /> */}
      </div>
      <div style={totalPriceContainer}>
        <h2 style={totalPriceTextStyle}>Total price: {totalPrice} SEK</h2>
      </div>
      <h2>Your purchase:</h2>
      {/* <div style={cardContainer}> */}
      <div style={purchasedItems}>
        {cart.map((product) => {
          return (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>
                {product.price} {product.quantity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PurchaseComplete;

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
  border: "2px solid red",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "20rem",
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
