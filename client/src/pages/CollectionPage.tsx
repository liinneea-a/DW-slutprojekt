import { CSSProperties } from "react";
import { useProducts } from "../components/context/ProductContext";
import ItemCard from "../components/ItemCard";

function CollectionPage() {
  const { collections } = useProducts();
  console.log(collections);
  return (
    <div style={collectionPageLayout}>
      <h1 style={collectionsTitle}>Here are all the available collections:</h1>
      <div style={flexProducts}>
        {collections.map((collection, index) => (
          <ItemCard key={index} collectionCard={collection} />
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
  alignItems: 'center',
  margin: "5rem 0",
  width: '70%',
  maxWidth: '1250px'
};

const collectionsTitle: CSSProperties = {
  textAlign: "center",
};

const collectionPageLayout: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
};

export default CollectionPage;
