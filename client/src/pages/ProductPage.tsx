import { CSSProperties } from "react";

function ProductPage() {
  return (
    <div style={rootStyle}>
      <div style={itemContainer}></div>
    </div>
  );
}

export default ProductPage;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
  height: "100%",
  backgroundColor: "#88D9E6",
};

const itemContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "90px",
  height: "90px",
  backgroundColor: "#526760",
};
