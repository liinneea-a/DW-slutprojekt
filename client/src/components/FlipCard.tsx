import { Product } from "@server/types";
import { CSSProperties, useState } from "react";
import { productRouter } from "../../../server/resources";
import "../CSS/FlipCard.css";
import { ProductData } from "../ProductData";

interface Props {
  product: ProductData;
}

function FlipCard(props: Props) {
  const [flip, setFlip] = useState(false);
//console.log(props.product.imageId)
  return (
    <div
      style={flipCard}
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="back"> {props.product.description}</div>
      <div className="front">
        <img className="image" src={props.product.imageUrl} alt="" />
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
