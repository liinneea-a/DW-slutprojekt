import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

function Header(headerProps: any) {
  const { cart } = useCart();

  const openModal = () => headerProps.setModalState(true);

  return (
    <div style={rootStyle}>
      <div style={innerHeader}>
        <div style={headerDiv1}>
          <Link style={headline} to="/">
            <h1 style={headline}>NFT Heaven</h1>
          </Link>
        </div>
        <div style={headerDiv2}>
          <Link style={linkStyle} to="/CollectionPage">
            <Button style={StyledButton} variant="contained" href="">
              EXPLORE
            </Button>
          </Link>
        </div>
        <div style={headerDiv3}>
          <Button style={headerCartLink} onClick={openModal}>
            {cart.reduce((sum, nft) => sum + nft.count, 0) !== 0 && (
              <div style={itemCountBadge}>
                <p style={countStyle}>
                  {cart.reduce((sum, nft) => sum + nft.count, 0)}
                </p>
              </div>
            )}
            <FontAwesomeIcon icon={faShoppingCart} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const rootStyle: CSSProperties = {
  background: "#04111d",
  color: "#eee",
  position: "sticky",
  top: 0,
  zIndex: "101",
};

const innerHeader: CSSProperties = {
  width: "90%",
  height: "10vh",
  display: "flex",
  margin: "0 auto",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1250px",
};

const headline: CSSProperties = {
  textDecoration: "none",
  color: "white",
  fontSize: 'clamp(3vmin, 4vmin, 4rem)'
};

const headerCartLink: CSSProperties = {
  color: "white",
  position: "relative",
  fontSize: 'clamp(5vmin, 7vmin, 2.7rem)'
};

const headerDiv1: CSSProperties = {
  width: "33%",
};
const headerDiv2: CSSProperties = {
  width: "33%",
  display: "flex",
  justifyContent: "center",
};
const headerDiv3: CSSProperties = {
  width: "33%",
  display: "flex",
  justifyContent: "flex-end",
};

const linkStyle: CSSProperties = { textDecoration: "none" };

const StyledButton: CSSProperties = {
  background: "#2081e2",
  margin: "1rem",
  fontSize: "3vmin",
  fontWeight: "bold",
};

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
  fontSize: ".8rem",
  color: "white",
  background: "#2081e2",
};

const countStyle: CSSProperties = {
  textAlign: 'center',
  margin: 0,
  width: "100%",
  lineHeight: 0,
  letterSpacing: 0,
  fontWeight: "bold",
};

export default Header;
