import { Product } from "@server/types";
import { createContext, FC, useContext, useState } from "react";
import { makeReq } from "../helper";

interface ProductContext {
  selectedProduct: {};
  setSelectedProduct: {};
  products: Product[];
  getAllProducts: () => Promise<any>;
  addProduct: (product: {}) => void;
  removeProduct: (product: Product) => void;
  editProduct: (product: Product) => void;
}

export const ProductsContext = createContext<ProductContext>({
  selectedProduct: {},
  setSelectedProduct: {},
  products: [],
  addProduct: async () => {},
  getAllProducts: async () => void [],
  removeProduct: async () => {},
  editProduct: () => {},
});

export const ProductProvider: FC = (props) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProducts = async () => {
    try {
      let { data, ok } = await makeReq("/api/products", "GET");
      if (ok) {
        setProducts(data);
        return true;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const addProduct = async (product: {}) => {
    try {
      let { data, ok } = await makeReq(`/api/product/`, "POST", product);
      if (ok) {
        return data;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const removeProduct = async (product: Product) => {
    try {
      let { data, ok } = await makeReq(`/api/products/${product.id}`, "DELETE");
      if (ok) {
        return data;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const editProduct = async (editedProduct: Product) => {
    try {
      let { data, ok } = await makeReq(
        `/api/products/${editedProduct.id}`,
        "PUT",
        editedProduct
      );
      if (ok) {
        return data;
      }
    } catch (err) {
      return console.log(err);
    }
  };

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
