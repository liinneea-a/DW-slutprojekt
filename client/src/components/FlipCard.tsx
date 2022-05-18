import { CSSProperties, useState } from "react";
import { collectionDataItem, NftItem } from "../data/collections/collection";
import "../CSS/FlipCard.css";

interface cardInfo {
  nftCard?: NftItem;
  collectionCard?: collectionDataItem;
  nftHeader?: string;
  collectionName?: string;
}

function FlipCard(props: cardInfo) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      style={flipCard}
      className={`card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="back"> {props.nftCard?.description}</div>
      <div className="front">
        <img className="image" srcSet={props.nftCard?.image} alt="" />
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
