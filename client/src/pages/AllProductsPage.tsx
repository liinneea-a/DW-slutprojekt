import { Button } from "@mui/material";
import { CSSProperties, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import { useProducts } from "../context/ProductContext";

function AllProducts() {
  const { getAllProducts, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const filteredProducts = products.filter(
    (p) => !category || p.categories.includes(category)
  );

  const categories = products.reduce<string[]>((list, product) => {
    list.push(...product.categories);
    return list;
  }, []);

  const uniqueCategories = Array.from(new Set(categories));

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div style={collectionPageLayout}>
      <h1 style={collectionsTitle}>Find your desired product by category!</h1>
      <div style={filterMenu}>
        <Button
          onClick={() => setSearchParams("")}
          style={buttonStyle}
          variant="contained"
        >
          All
        </Button>
        {uniqueCategories.map((category) => (
          <Button
          key={category}
            onClick={() => setSearchParams({ category })}
            style={buttonStyle}
            variant="contained"
          >
            {category}
          </Button>
        ))}
      </div>
      <h1 style={collectionsTitle}>Here are all the available products:</h1>
      <div style={flexProducts}>
        {filteredProducts.map((product, index) => (
          <ItemCard key={product.id} product={product} />
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

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "rgb(32, 129, 226)",
  color: "white",
  fontSize: "small",
  maxWidth: "40%",
  width: "10rem",
};

const filterMenu: CSSProperties = {
  display: "flex",
  width: "75%",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "1rem",
};

export default AllProducts;
