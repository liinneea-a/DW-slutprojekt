import { createContext, FC, useContext, useState } from "react";
import type { Product } from "@server/types";

/* const product: Product = {
  _id: "",
  
} */
interface ProductContext {
  selectedProduct: {};
  setSelectedProduct: {};
  products: Product[];
  getAllProducts: () => Promise<any>;
  addProduct: () => void;
  removeProduct: () => void;
  editProduct: () => void;
}

const ProductsContext = createContext<ProductContext>({
  selectedProduct: {},
  setSelectedProduct: {},
  products: [],
  addProduct: () => {},
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

  const addProduct = () => {};

  const removeProduct = () => {};

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
