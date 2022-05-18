import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCoins } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Modal, Typography } from "@mui/material";
import { CSSProperties, useState } from "react";
import { collectionData } from "../data/collections/collection";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

interface CartProps {
  modalState: boolean;
  setModalState: any;
}

function CartModal(props: CartProps) {
  const { cart, decQty, incQty, clearCart, totalPrice } = useCart();
  const handleClose = () => props.setModalState(false);
  const [collectionList, setCollectionList] = useState(collectionData);

  return (
    <div>
      <Modal
        open={props.modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={boxStyle}>
          {cart.length === 0 ? (
            <h1 style={emptyCartTextStyle}>Your cart is empty!</h1>
          ) : (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h1">
                <div style={cartHeader}>
                  <div style={prodCol}>Product</div>
                  <div style={qtyCol}>Quantity</div>
                  <div style={priceCol}>Price</div>
                </div>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                component="div"
              >
                {cart.map((item: any, index: number) => (
                  <div style={nftContainer} key={index}>
                    <div style={iconCol}>
                      <img style={iconStyle} srcSet={item.image} alt="test" />
                    </div>
                    <div style={prodColMid}>
                      <div style={nameColMid}>
                        {
                          collectionList.find(
                            (col) => col.id === item.collectionID
                          )?.name
                        }
                        &nbsp;#{item.NFTid}
                      </div>
                      <div style={itemDescStyle}>{item.description}</div>
                    </div>
                    <div style={qtyCol}>
                      <FontAwesomeIcon
                        icon={faMinus}
                        style={iconStyle}
                        onClick={() => decQty(item.NFTid)}
                      />
                      {item.count}
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={iconStyle}
                        onClick={() => incQty(item.NFTid)}
                      />
                    </div>
                    <div style={priceCol}>
                      <FontAwesomeIcon icon={faCoins} />
                      &nbsp;{item.price}
                    </div>
                  </div>
                ))}
                <div style={priceStyle}>
                  Your total:&nbsp;{" "}
                  <FontAwesomeIcon style={coinIcon} icon={faCoins} />
                  {totalPrice}
                </div>
                <div style={cartFooter}>
                  <div style={cartButton}>
                    <Button
                      style={buttonStyle}
                      variant="contained"
                      onClick={clearCart}
                    >
                      Empty your cart
                    </Button>
                    <Link
                      style={linkStyle}
                      onClick={handleClose}
                      to={"/Checkout"}
                    >
                      <Button style={buttonStyle} variant="contained">
                        Proceed to checkout
                      </Button>
                    </Link>
                  </div>
                </div>
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}

const boxStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "20rem",
  maxHeight: '90vh',
  overflowY: 'scroll',
  background: "#202225",
  border: "1px solid #303339",
  borderRadius: "1rem",
  boxShadow: "24",
  padding: "2%",
  color: "white",
  scrollbarWidth: "none",
};

const emptyCartTextStyle: CSSProperties = { textAlign: "center" };

const cartHeader: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  width: "100%",
  fontSize: "clamp(1vmin, 3vmin, 1.5rem)",
};

const itemDescStyle: CSSProperties = { 
  fontSize: "clamp(1vmin, 2.5vmin, .9rem)", 
};

const nameColMid: CSSProperties = { 
  fontWeight: "bold",
  fontSize: 'clamp(1vmin, 3vmin, 1.5rem)'
};

const cartFooter: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap-reverse",
  gap: "1rem",
  width: "100%",
  marginTop: "0.7rem",
};

const iconCol: CSSProperties = {
  width: "10%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const prodCol: CSSProperties = {
  width: "70%",
};

const prodColMid: CSSProperties = {
  width: "60%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  fontSize: "clamp(1vmin, 3vmin, 1.5rem)",
};

const qtyCol: CSSProperties = {
  width: "15%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "clamp(1vmin, 3vmin, 1.5rem)",
};

const priceCol: CSSProperties = {
  width: "15%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "clamp(1vmin, 3vmin, 1.5rem)",
};

const coinIcon: CSSProperties = { marginRight: ".2rem" };

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#2081e2",
  color: "white",
  fontSize: "clamp(1.8vmin, 3vmin, 1.2rem)",
};

const nftContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  width: "100%",
  margin: ".5rem 0",
  borderBottom: "1px solid white",
  paddingBottom: ".5rem",
};

const cartButton: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "1rem",
  flexWrap: "wrap",
};

const iconStyle: CSSProperties = {
  width: "100%",
  cursor: "pointer",
};

const priceStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
  fontSize: "1.5rem",
  alignItems: "center",
};

const linkStyle: CSSProperties = {
  textDecoration: "none",
};

export default CartModal;
