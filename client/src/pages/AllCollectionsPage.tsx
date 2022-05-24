import { CSSProperties } from "react";
import ItemCard from "../components/ItemCard";
import { useProducts } from "../context/ProductContext";

function AllCollections() {
  const { products } = useProducts();
  return (
    <div style={collectionPageLayout}>
      <h1 style={collectionsTitle}>Here are all the available products:</h1>
      <div style={flexProducts}>
        {products.map((product, index) => (
          <ItemCard key={index} productCard={product} />
        ))}
      </div>
    </div>
  );
}

const flexProducts: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  justifyContent: "center",
  alignItems: "center",
  margin: "5rem 0",
};

const collectionsTitle: CSSProperties = {
  textAlign: "center",
};

const collectionPageLayout: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  maxWidth: "80rem",
};

export default AllCollections;
