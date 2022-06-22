import { Button } from "@mui/material";
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
      <Button
      style={buttonStyle}
      color="primary"
      variant="contained"
      fullWidth
      type="submit" onClick={handleOnClick}>Back to startpage</Button>
    )
}

const buttonStyle: CSSProperties = {
  width: 'fit-content',
    border: "none",
    color: "white",
    fontSize: "3vmin",
    marginBottom: '1rem',
    fontWeight: 'bold'
  }