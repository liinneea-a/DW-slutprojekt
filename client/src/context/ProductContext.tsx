//import { Product } from "@server/types";
import { createContext, FC, useContext, useState } from "react";

        

// import { Product } from "../../../server/resources";

        
// import { Product } from "../../../../server/resources/shared";
        

import { makeReq } from "../helper";

/* const product: Product = {
  _id: "",
  
} */
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
    let response = await makeReq(`/api/product/`, "POST", product);
    return response;
  };

  const removeProduct = async (product: Product) => {
    let response = await makeReq(`/api/products/${product.id}`, "DELETE");
    return response;
  };

  const editProduct = async (editedProduct: Product) => {
    let response = await makeReq(
      `/api/products/${editedProduct.id}`,
      "PUT",
      editedProduct
    );
    return response;
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
