import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


export const StartPageButton = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    const handleOnClick = () => {
        clearCart();
        navigate('/');
        window.location.reload();
      };

    return (
        <button onClick={handleOnClick} style={buttonStyle}>Back to startpage</button>
    )
}

const buttonStyle: CSSProperties = {
    width: "100%",
    border: "none",
    color: "white",
    backgroundColor: "transparent",
    fontSize: "1.5rem",
    margin: "0 100% 0 20%",
  }