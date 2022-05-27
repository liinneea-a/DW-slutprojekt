import { Button } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { useProducts } from "../context/ProductContext";

function StartPage() {
  const { getAllProducts, products } = useProducts();

  let randomList = products
    .sort(() => Math.random() - Math.random())
    .slice(0, 6);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div style={rootStyle}>
      <div style={contentContainer}>
        <div style={startPageWelcomeText}>
          <h2 style={startPageHeadline}>
            Buy extreme NFTs and don't look back!
          </h2>
          <p style={headlineSubText}>
            Are you looking for insane NFTs? Do you want to make money quick?
            You've come to the right place. We scoured the internet and
            handpicked the best NFTS for you! Enjoy!
          </p>
        </div>
        <Link style={linkStyle} to="/all">
            <Button style={StyledButton} variant="contained" href="">
               ALL PRODUCTS
            </Button>
          </Link>
        <div style={hottestStyle}>
          <div style={hottestTitle}>
            <h1>HOTTEST ITEMS RIGHT NOW</h1>
          </div>

          <div style={flexProducts}>
            {randomList.map((products, index) => (
              <ItemCard key={index} product={products} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartPage;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0",
  maxWidth: "80rem",
  // border: "2px solid #88D9E6",
};

const startPageHeadline: CSSProperties = {
  fontSize: "2rem",
  textAlign: "center",
  padding: "0 1rem",
};

const headlineSubText: CSSProperties = {
  maxWidth: "30rem",
  textAlign: "center",
  padding: "0 1rem",
};

const flexProducts: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  flexDirection: "row-reverse",
  justifyContent: "space-evenly",
  margin: "1rem 0",
};

const startPageWelcomeText: CSSProperties = {
  maxWidth: "40rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const contentContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const hottestStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2rem",
};

const hottestTitle: CSSProperties = {
  textAlign: "center",
  margin: "0 1rem",
};

const linkStyle: CSSProperties = { textDecoration: "none" };

const StyledButton: CSSProperties = {
  background: "#2081e2",
  margin: "1rem",
  fontSize: "3vmin",
  fontWeight: "bold",
};
