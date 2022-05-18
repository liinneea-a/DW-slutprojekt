import { CSSProperties } from "react";
import { useProducts } from "../components/context/ProductContext";
import ItemCard from "../components/ItemCard";

function StartPage(startPageProps: any) {
  const { randomCollections } = useProducts();

  // let randomList =  collections.sort(() => Math.random() - Math.random()).slice(0, 3)

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
        <div style={hottestStyle}>
          <div style={hottestTitle}>
            <h1>HOTTEST COLLECTIONS RIGHT NOW</h1>
          </div>
          <div style={flexProducts}>
            {randomCollections.map((collection, index) => (
              <ItemCard key={index} collectionCard={collection} />
            ))}
          </div>
        </div>
        <div style={hottestStyle}>
          <div style={hottestTitle}>
            <h1>HOTTEST ITEMS RIGHT NOW</h1>
          </div>
          <div style={flexItems}>
            {randomCollections.map((collection, index) => (
              <ItemCard
                key={index}
                nftCard={collection.NFTS[0]}
                nftHeader={collection?.header}
                collectionName={collection?.name}
              />
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
  margin: "0 auto",
  width: "100%",
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

const flexItems: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
  justifyContent: "space-evenly",
  margin: "1rem 1rem",
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
  margin: '0 1rem'
};
