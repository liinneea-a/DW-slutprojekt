import { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../components/context/ProductContext";
import ItemCard from "../components/ItemCard";

function Collections() {
  // Använder ID från routern (:id) lägger det i en variabel
  const { id } = useParams();

  // Hämtar hem den orgienlla listan för sedan kunna leta igenom den
  const { collections } = useProducts();

  // Letar i colllection listan efter id som matchar URL routerns ID och sedan sätter det objectet till "Collection"
  const [collection, setCollection] = useState(
    collections.find((p) => p.id.toString() === id)
  );

  const [nft, setNFT] = useState(collection?.NFTS);

  // Sedar passar vi in "nft" då i varje productCard som är NFTSEN :)

  useEffect(() => {}, []);

  return (
    <div style={collectionsPage}>
      <div style={collectionsContainer}>
        <div style={CollectionDescriptionContainer}>
          <div style={collectionNameContainer}>
            <h1 style={collectionNameStyle}>{collection?.name}</h1>
          </div>
          <div style={descriptionStyle}>
            <img
              style={productImage}
              srcSet={collection?.productImage}
              alt="test"
            />
            <h2 style={collectionDescriptionStyle}>
              {collection?.description}
            </h2>
          </div>
        </div>
      </div>
      <div style={flexProducts}>
        {nft?.map((nftItem, index) => (
          <ItemCard
            key={index}
            nftCard={nftItem}
            nftHeader={collection?.header}
            collectionName={collection?.name}
          />
        ))}
      </div>
    </div>
  );
}

const collectionsPage: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: 'center'
};

const collectionsContainer: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: 'center',
  flexDirection: 'column',
  gap: "1rem",
};

const collectionNameContainer: CSSProperties = { textAlign: "center" };

const collectionNameStyle: CSSProperties = { fontSize: "3rem" };

const collectionDescriptionStyle: CSSProperties = { maxWidth: "35rem" };

const flexProducts: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  justifyContent: "center",
  margin: "5rem 0",
  width: "70%",
  maxWidth: "1250px",
};

const CollectionDescriptionContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "80%",
};

const descriptionStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  gap: "2rem",
  flexWrap: "wrap",
  textAlign: "center",
};

const productImage: CSSProperties = {
  height: "10rem",
  borderRadius: "1rem",
};

export default Collections;
