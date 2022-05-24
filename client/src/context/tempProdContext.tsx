import { createContext, useContext, useState } from "react";
import { productData, productDataItem } from "../data/collections/dataTest";
import { makeReq } from "../helper";

interface ProductContext {
  products: productDataItem[];
  fetchProducts: () => void;
  addProduct: (product: productDataItem) => void;
  removeProduct: (productID: number) => void;
  editProduct: (product: productDataItem) => void;
  editProductModal: boolean;
  openEditProductModal: (product: productDataItem) => void;
  closeEditProductModal: () => void;
}

const ProductsContext = createContext<ProductContext>({
  products: [],
  addProduct: (product: productDataItem) => {},
  fetchProducts: () => {},
  removeProduct: (productID: number) => {},
  editProduct: (product: productDataItem) => {},
  editProductModal: false,
  openEditProductModal: (product: productDataItem) => {},
  closeEditProductModal: () => {},
});

export const ProductProvider = () => {
  let localData = localStorage.getItem("products");
  const [editProductModal, setEditProductModal] = useState(false);
  const [products, setProducts] = useState(
    localData ? JSON.parse(localData) : productData
  );

  const openEditProductModal = (product: productDataItem) => {
    setEditProductModal(true);
  };

  const closeEditProductModal = () => {
    setEditProductModal(false);
  };

  const fetchProducts = async () => {
    try {
      let response = await makeReq(`/api/product`, "GET");
      console.log(response);
    } catch (err) {
      return console.log(err);
    }
  };

  const addProduct = (product: productDataItem) => {
    product.productID = products.length + 1;
    let updatedList = [...products, product];
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
  };

  const removeProduct = (productproductID: number) => {
    let updatedList = products.filter(
      (item: any) => item.productID !== productproductID
    );
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
  };

  const editProduct = (newProduct: productDataItem) => {
    let updatedList = products.map((product: productDataItem) => {
      if (product.productID === newProduct.productID) {
        product = newProduct;
        return product;
      }
      return product;
    });
    setProducts(updatedList);
    localStorage.setItem("products", JSON.stringify(updatedList));
  };

  return (
    <ProductsContext.Provider
      value={{
        closeEditProductModal,
        openEditProductModal,
        fetchProducts,
        editProductModal,
        products,
        addProduct,
        removeProduct,
        editProduct,
      }}
    ></ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
