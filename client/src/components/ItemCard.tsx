import { Button } from "@mui/material";
import { Product } from "@shared/types";
import { CSSProperties, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import FlipCard from "./FlipCard";

interface Props {
  product: Product;
}

function ItemCard(props: Props) {
  const { getAllProducts } = useProducts();
  const { addProductToCart } = useCart();

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleOnClickBuy = (product: Product) => {
    addProductToCart(product)
  }

  return (
    <div style={cardContainer}>
      <div style={cardHeader}>
        <div style={headerText}> Product nr: {props.product.name}</div>
        <div style={priceStyle}>Price: {props.product.price} SEK</div>
      </div>
      <p style={clickMeStyle}>Click me!</p>
      <div style={cardContent}>
        <FlipCard key={props.product.id} product={props.product} />
        {props.product.stock ? (
        <Button
        style={buttonStyle}
        variant="contained"
        onClick={() => handleOnClickBuy(props.product)}
        >
          BUY NOW
        </Button>) : (<Button
        style={NotInStockStyle}
        variant="contained"
        >
          Not in stock
        </Button>)
        } 
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

const NotInStockStyle: CSSProperties = {
  fontWeight: "bold",
  background: "grey",
  color: "white",
};

const cardHeader: CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
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
