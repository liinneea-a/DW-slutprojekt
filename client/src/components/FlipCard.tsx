import { Product } from "@server/types";
import { CSSProperties, useState } from "react";
import "../CSS/FlipCard.css";

interface Props {
  product: Product;
}

function FlipCard(props: Props) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      style={flipCard}
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="back"> {props.product.description}</div>
      <div className="front">
        <img className="image" srcSet={props.product.imageId} alt="" />
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
