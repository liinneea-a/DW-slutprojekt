import { createContext, FC, useContext, useState } from "react";
import {
  collectionData,
  collectionDataItem,
  NftItem
} from "../../data/collections/collection";

interface ProductContext {
  randomCollections: collectionDataItem[];
  collections: collectionDataItem[];
  addCollection: (collection: collectionDataItem) => void;
  closeAddCollectionModal: () => void;
  removeCollection: (collectionID: number) => void;
  openAddCollectionModal: () => void;
  editCollection: (collection: collectionDataItem) => void;
  addNft: (nft: NftItem, collectionID: number) => void;
  removeNft: (collectionID: number, nftID: number) => void;
  editNft: (nft: NftItem, collectionID?: number) => void;
  selectedCollectionID: number;
  selectedNftID: number;
  addNftModal: boolean;
  openAddNftModal: (collectionID: number) => void;
  closeAddNftModal: () => void;
  editNftModal: boolean;
  editCollectionModal: boolean;
  openEditNftModal: (
    nft: NftItem,
    collectionID: number,
    collection: collectionDataItem
  ) => void;
  closeEditNftModal: () => void;
  selectedCollection: collectionDataItem;
  selectedNFT: NftItem;
  openEditCollectionModal: (collection: collectionDataItem) => void;
  closeEditCollectionModal: () => void;
  addCollectionModal: boolean;
}

const ProductsContext = createContext<ProductContext>({
  randomCollections: [],
  collections: [],
  addCollection: (collection: collectionDataItem) => {},
  removeCollection: (collectionID: number) => {},
  addCollectionModal: false,
  openAddCollectionModal: () => {},
  closeAddCollectionModal: () => {},
  editCollection: (collection: collectionDataItem) => {},
  addNft: (nft: NftItem, collectionID: number) => {},
  removeNft: (collectionID: number, nftID: number) => {},
  editNft: (nft: NftItem, collectionID?: number) => {},
  selectedCollectionID: 0,
  selectedNftID: 0,
  addNftModal: false,
  openAddNftModal: (collectionID: number) => {},
  closeAddNftModal: () => {},
  editNftModal: false,
  openEditNftModal: (
    nft: NftItem,
    collectionID: number,
    collection: collectionDataItem
  ) => {},
  closeEditNftModal: () => {},
  selectedCollection: {
    id: 420,
    name: "test",
    description: "test",
    volumeTraded: 1,
    floorPrice: 1,
    header: "test",
    productImage: "test",
    NFTS: [],
  },
  selectedNFT: {
    NFTid: 12,
    image: "test",
    price: 12,
    description: "bollar",
    count: 12,
    collectionID: 1,
  },
  editCollectionModal: false,
  openEditCollectionModal: (collection: collectionDataItem) => {},
  closeEditCollectionModal: () => {},
});

export const ProductProvider: FC = (props) => {
  let localData = localStorage.getItem("collections");
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const [addNftModal, setAddNftModal] = useState(false);
  const [editCollectionModal, setEditCollectionModal] = useState(false);
  const [editNftModal, setEditNftModal] = useState(false);
  const [collections, setCollections] = useState(
    localData ? JSON.parse(localData) : collectionData
  );
  const [selectedCollectionID, setSelectedCollectionID] = useState(0);
  const [selectedNftID, setSelectedNftID] = useState(0);
  const [selectedNFT, setSelectedNFT] = useState({
    NFTid: 12,
    image: "test",
    price: 12,
    description: "bollar",
    count: 12,
    collectionID: 1,
  });
  const [selectedCollection, setSelectedCollection] = useState({
    id: 420,
    name: "test",
    description: "test",
    volumeTraded: 1,
    floorPrice: 1,
    header: "test",
    productImage: "test",
    NFTS: [
      {
        NFTid: 12,
        image: "test",
        price: 12,
        description: "bollar",
        count: 12,
        collectionID: 1,
      },
    ],
  });
  const [randomCollections, setRandomCollections] = useState(
    collections.sort(() => Math.random() - Math.random()).slice(0, 3)
  );

  const openAddCollectionModal = () => {
    setAddCollectionModal(true);
  };

  const closeAddCollectionModal = () => {
    setAddCollectionModal(false);
  };

  const openAddNftModal = (collectionID: number) => {
    setAddNftModal(true);
    setSelectedCollectionID(collectionID);
  };
  const closeAddNftModal = () => {
    setAddNftModal(false);
  };

  const openEditCollectionModal = (collection: collectionDataItem) => {
    setEditCollectionModal(true);
    setSelectedCollection(collection);
  };

  const closeEditCollectionModal = () => {
    setEditCollectionModal(false);
  };

  const openEditNftModal = (
    nft: NftItem,
    collectionID: number,
    collection: collectionDataItem
  ) => {
    setSelectedCollectionID(collectionID);
    setSelectedNFT(nft);
    setSelectedCollection(collection);
    // setSelectedNftID(nftID)
    // setSelectedCollection(collections.find((collectionItem : collectionDataItem) => selectedCollectionID === collectionItem.id))
    // setSelectedNFT(collections.find((collectionItem : collectionDataItem) => selectedCollectionID === collectionItem.id)?.NFTS.find((item : NftItem) => item.NFTid === selectedNftID))
    setEditNftModal(true);
  };
  const closeEditNftModal = () => {
    setEditNftModal(false);
  };

  const addCollection = (collection: collectionDataItem) => {
    collection.id = collections.length + 1;
    let updatedList = [...collections, collection];
    setCollections(updatedList);
    localStorage.setItem("collections", JSON.stringify(updatedList));
  };

  const removeCollection = (collectionID: number) => {
    let updatedList = collections.filter(
      (item: any) => item.id !== collectionID
    );
    setCollections(updatedList);
    localStorage.setItem("collections", JSON.stringify(updatedList));
  };

  const editCollection = (newCollection: collectionDataItem) => {
    let updatedList = collections.map((collection: collectionDataItem) => {
      if (collection.id === newCollection.id) {
        collection = newCollection;
        return collection;
      }
      return collection;
    });
    setCollections(updatedList);
    localStorage.setItem("collections", JSON.stringify(updatedList));
  };

  const editNft = (nft: NftItem, collectionID?: number) => {
    let updatedList = collections.map((collection: collectionDataItem) => {
      if (collection.id === collectionID) {
        collection.NFTS = collection.NFTS.map((nftItem: NftItem) => {
          if (nftItem.NFTid === nft.NFTid) {
            nftItem = nft;
            // console.log(nftItem)
            return nftItem;
          }
          return nftItem;
        });
      }
      return collection;
    });
    console.log(updatedList);
    setCollections(updatedList);
    localStorage.setItem("collections", JSON.stringify(updatedList));
  };
  const addNft = (nft: NftItem, collectionID: number) => {
    let updatedList = collections.map((collection: collectionDataItem) => {
      if (collection.id === collectionID) {
        nft.collectionID = collectionID;
        collection.NFTS = [...collection.NFTS, nft];
        console.log(collection.NFTS);
      }
      return collection;
    });
    setCollections(updatedList);
    localStorage.setItem("collections", JSON.stringify(updatedList));
  };
  const removeNft = (collectionID: number, nftID: number) => {
    let updatedList = collections.map((collection: collectionDataItem) => {
      if (collection.id === collectionID) {
        collection.NFTS = collection.NFTS.filter(
          (nft: NftItem) => nft.NFTid !== nftID
        );
      }
      return collection;
    });
    setCollections(updatedList);
  };

  return (
    <ProductsContext.Provider
      value={{
        closeEditCollectionModal,
        randomCollections,
        openEditCollectionModal,
        editCollectionModal,
        selectedNFT,
        selectedCollection,
        collections,
        addCollection,
        removeCollection,
        editCollection,
        addNft,
        editNft,
        removeNft,
        addNftModal,
        closeAddNftModal,
        openAddNftModal,
        editNftModal,
        openEditNftModal,
        closeEditNftModal,
        selectedCollectionID,
        selectedNftID,
        openAddCollectionModal,
        closeAddCollectionModal,
        addCollectionModal,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
