import { Button } from "@mui/material";
import { CSSProperties } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { productDataItem } from "../data/collections/dataTest";
import FlipCard from "./FlipCard";

interface cardInfo {
  productCard?: productDataItem;
}

function ItemCard(props: cardInfo) {
  const { addProduct } = useCart();

  const productInfo = {
    id: props.productCard?.productID,
    price: props.productCard?.price,
    image: props.productCard?.image,
    description: props.productCard?.description,
    count: props.productCard?.count,
    categories: props.productCard?.categories,
  };

  return (
    <div style={cardContainer}>
      <div style={cardHeader}>
        <div style={headerText}>
          <div> Product #{productInfo.id}
          </div>
          <div style={priceStyle}>
            Price: {productInfo.price} SEK
          </div>
        </div>
      </div>
      <p style={clickMeStyle}>Click me!</p>
      <div style={cardContent}>
        <FlipCard productCard={props.productCard} />
        <Button
          style={buttonStyle}
          variant="contained"
          // onClick={() => addProduct(props.productCard)}
        >
          BUY NOW
        </Button>
      </div>
    </div>
  );
}

export default ItemCard;

const cardContainer: CSSProperties = {
  width: "20rem",
  borderRadius: ".5rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "1rem",
  background: "#303339",
  boxShadow: "1px 1px 6px black",
  position: "relative",
};
const cardPicture: CSSProperties = {
  width: "18rem",
};

const clickMeStyle: CSSProperties = {
  margin: 0,
  position: "absolute",
  zIndex: "100",
  top: "23%",
  left: "1%",
  fontWeight: "bold",
  fontSize: "smaller",
  transform: "rotate(-30deg)",
  background: "#2081e2",
  padding: ".5rem",
  pointerEvents: "none",
};

const productImage: CSSProperties = {
  width: "100%",
};

const priceStyle: CSSProperties = {
  fontSize: "1rem",
  display: "flex",
  justifyContent: "space-between",
};

const coinIconStyle: CSSProperties = { paddingRight: ".3rem" };

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#2081e2",
  color: "white",
};

const cardHeader: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  margin: "1rem",
};

const headerText: CSSProperties = {
  textAlign: "center",
  fontSize: "1.5rem",
};

const collectionImage: CSSProperties = {
  width: "4rem",
  display: "flex",
  alignItems: "center",
};

const cardContent: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  width: "95%",
  padding: ".5rem",
};
