import { faCoins, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { CSSProperties } from "react";
import AddNewCollection from "../components/admin/addNewCollection";
import AddNewNFT from "../components/admin/addNewNFT";
import EditCollection from "../components/admin/editCollection";
import EditNFT from "../components/admin/editNFT";
import { useProducts } from "../components/context/ProductContext";


function AdminPage() {
  const {
    collections,
    removeCollection,
    removeNft,
    openAddCollectionModal,
    openAddNftModal,
    openEditNftModal,
    openEditCollectionModal,
  } = useProducts();

  return (
    <div style={adminPageLayout}>
      <Button
        onClick={() => localStorage.clear()}
        style={buttonStyle}
        variant="contained"
        href=""
      >
        Clear local storage
      </Button>
      <Button
        onClick={() => openAddCollectionModal()}
        style={buttonStyle}
        variant="contained"
        href=""
      >
        Add Collection
      </Button>
      <div>
        <AddNewCollection />
        <AddNewNFT />
        <EditNFT />
        <EditCollection />
      </div>
      {collections.map((collection, index) => (
        <div style={adminCollections} key={index}>
          {" "}
          {/* DETTA ÄR COLLECTION DIVEN */}
          <div style={adminCollectionsHeader}>
            <div style={headerLeft}>
              <h1>{collection.name}</h1>
              <p>Innehåller {collection.NFTS.length} NFTS</p>
            </div>
            <div style={headerRight}>
              <Button
                onClick={() => removeCollection(collection.id)}
                style={buttonStyle}
                variant="contained"
                href=""
              >
                Remove
              </Button>
              <Button
                style={buttonStyle}
                variant="contained"
                href=""
                onClick={() => openEditCollectionModal(collection)  }
              >
                Edit
              </Button>
              <Button
                onClick={() => openAddNftModal(collection.id)}
                style={buttonStyle}
                variant="contained"
                href=""
              >
                Add NFT
              </Button>
            </div>
          </div>
          <div style={adminCollectionMain}>
            {collection.NFTS.map((nft, index /* DETTA ÄR NFTERNA */) => (
              <div style={adminAddStyle} key={index}>
                <div style={adminCardHeader}>
                  <div>
                    <FontAwesomeIcon icon={faCoins} />
                    {nft.price}
                  </div>
                  <div>ID #{nft.NFTid}</div>
                </div>
                <img style={adminImageStyle} alt="" srcSet={nft.image} />
                <div style={descStyle}>
                {nft.description}
                </div>
                <FontAwesomeIcon
                  icon={faRemove}
                  onClick={() => removeNft(collection.id, nft.NFTid)}
                  style={removeButton}
                />
                <Button
                  onClick={() =>
                    openEditNftModal(nft, collection.id, collection)
                  }
                  style={editButtonStyle}
                  variant="contained"
                  href=""
                >
                  Edit NFT
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;

const adminPageLayout: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  overflowX: 'hidden',
  paddingBottom: '2rem',
  width: '100%',
};

const adminCollections: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  width: "90%",
  padding: "0 1rem 1rem 1rem",
  gap: "1rem",
};

const adminCollectionsHeader: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "1rem",
  width: "100%",
  flexWrap: "wrap",
};

const adminAddStyle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexDirection: "column",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  background: "#303339",
  width: "clamp(12vmin, 33vmin, 8.5rem",
  padding: "1rem",
  textAlign: "center",
  position: "relative",
};

const adminCardHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-evenly",
  width: "100%",
};

const adminImageStyle: CSSProperties = {
  width: "90%",
  maxHeight: "30vh",
};

const adminCollectionMain: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const headerLeft: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

const descStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: '100%',
  fontSize: "clamp(1.5vmin, 2vmin, 1rem)",
};

const headerRight: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "rgb(32, 129, 226)",
  color: "white",
  fontSize: "small",
  width: "10rem",
};

const editButtonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#2081e2",
  color: "white",
  fontSize: "small",
  width: "100%",
  marginTop: "auto",
  justifySelf: "flex-end",
};

const removeButton: CSSProperties = {
  position: "absolute",
  right: ".6rem",
  top: ".6rem",
  fontSize: "1.3rem",
  cursor: "pointer",
};
