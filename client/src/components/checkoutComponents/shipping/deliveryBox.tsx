import { getDelivery } from "./deliverySwitch";
import { CSSProperties } from "react";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface deliveryItem {
  deliveryOption: string;
}

function DeliveryBox(props: deliveryItem) {
  return (
    <div>
      {props.deliveryOption && (
        <div style={deliveryOptionDescription}>
          <div style={deliveryOptionContainer}>
            <img
              style={deliveryOptionThumbnail}
              srcSet={getDelivery(props.deliveryOption).image}
              alt="ICON"
            />
            <p style={deliveryDescription}>
              {getDelivery(props.deliveryOption).description}
            </p>
          </div>
          <div style={shippingPriceContainer}>
            <p> Shipping price: {getDelivery(props.deliveryOption).price} </p>
            <FontAwesomeIcon icon={faCoins} style={coinIcon} />
          </div>
        </div>
      )}
      <div style={deliveryDateText}>
        <p>{getDelivery(props.deliveryOption).time}</p>
      </div>
    </div>
  );
}

export default DeliveryBox;

const deliveryOptionDescription: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: "1rem",
  paddingBottom: "1rem",
};

const deliveryOptionContainer: CSSProperties = { display: "flex" };

const deliveryDescription: CSSProperties = {
  fontSize: ".8rem",
  display: "flex",
  alignItems: "center",
};

const shippingPriceContainer: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const coinIcon: CSSProperties = { marginLeft: "0.3rem" };

const deliveryOptionThumbnail: CSSProperties = {
  padding: "0.5rem",
  height: "4rem",
  borderRadius: "50%",
};

const deliveryDateText: CSSProperties = {
  textAlign: "center",
  fontSize: "1.2rem",
};
