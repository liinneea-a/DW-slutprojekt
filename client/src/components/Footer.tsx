import { CSSProperties } from "react";

function Footer() {
  return (
    <div>
      <div style={footerStyle}>
        © Created by FrontFelix, AdaHep and MiMeiner, 2022.
        <br />
        © Updated by liinneea-a, rosannapistone, and MiMeiner, 2022.
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
