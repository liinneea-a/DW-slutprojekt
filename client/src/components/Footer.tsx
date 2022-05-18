import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function Footer() {
  return (
    <div>
      <div style={footerStyle}>
        © Created by FrontFelix, AdaHep and MiMeiner, 2022.
        <Link to="/Admin" style={{textDecoration: 'none'}}>
          <Button style={StyledButton} variant="contained" href="">
            ADMIN
          </Button>
        </Link>
      </div>
    </div>
  );
}

const StyledButton: CSSProperties = {
  background: "#2081e2",
  margin: "1rem",
  fontSize: "1rem",
  fontWeight: "bold",
};

const footerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: 'column',
  textAlign: 'center',
  padding: '3rem 1rem 1rem 1rem'
};

export default Footer;
