import { createContext, FC, useContext, useState } from "react";
import { Product } from "@shared/types";
import { makeReq } from "../helper";

interface ProductContext {
  selectedProduct: {};
  setSelectedProduct: {};
  products: Product[];
  getAllProducts: () => Promise<any>;
  addProduct: ({}) => Promise<any>;
  removeProduct: () => void;
  editProduct: () => void;
}

export const ProductsContext = createContext<ProductContext>({
  selectedProduct: {},
  setSelectedProduct: {},
  products: [],
  addProduct: async () => {},
  getAllProducts: async () => void [],
  removeProduct: () => {},
  editProduct: () => {},
});

export const ProductProvider: FC = (props) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    const response = await fetch("/api/testproducts");
    const result = await response.json();
    setProducts(result);
  };

  const addProduct = async (product: {}) => {
    console.log(product);

    let response = await makeReq("/api/testproduct", "POST", product);
    return response;
  };

  const removeProduct = async () => {};

  const editProduct = () => {};

  return (
    <ProductsContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        products,
        getAllProducts,
        addProduct,
        removeProduct,
        editProduct,
      }}
    >
      {" "}
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
