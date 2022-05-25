import { CSSProperties, useState } from "react";
import { Product } from "@shared/types";
import "../CSS/FlipCard.css";

interface productInfo {
  productCard?: Product[];
}

function FlipCard(props: productInfo) {
  const [flip, setFlip] = useState(false);

  const productInfo = {
    id: props.productCard?.
  }

  return (
    <div
      style={flipCard}
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="back"> {props.productCard?.description}</div>
      <div className="front">
        <img className="image" srcSet={props.productCard?.image} alt="" />
      </div>
    </div>
  );
}

export default FlipCard;

const flipCard: CSSProperties = {
  height: "20rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "20rem",
  position: "relative",
};
