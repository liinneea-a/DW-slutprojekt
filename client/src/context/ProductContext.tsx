//import { Product } from "@server/types";
import { createContext, FC, useContext, useState } from "react";

import { ProductData } from "../ProductData";     

//import { Product as ProductData } from "../../../server/resources";

        
import { Product } from "../../../server/resources";
        

import { makeReq } from "../helper";

/* const product: Product = {
  _id: "",
  
} */

/* export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageId?: string;
  stock: number;
  categories: string[];
  quantity: number;
  imageUrl?: string;
} */
interface ProductContext {
  selectedProduct: {};
  setSelectedProduct: {};
  products: ProductData[];
  getAllProducts: () => Promise<any>;
  addProduct: (product: ProductData) => void;
  removeProduct: (product: ProductData) => void;
  editProduct: (product: ProductData) => void;
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
  const [products, setProducts] = useState<ProductData[]>([]);

  const getAllProducts = async () => {
    try {
      let { data, ok } = await makeReq("/api/products", "GET");
      if (ok) {
        console.log(data)
        setProducts(data);
        return true;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  const addProduct = async (product: ProductData) => {
    let response = await makeReq(`/api/product/`, "POST", product);
    console.log(response)
    return response;
  };

  const removeProduct = async (product: ProductData) => {
    let response = await makeReq(`/api/products/${product._id}`, "DELETE");
    return response;
  };

  const editProduct = async (editedProduct: ProductData) => {
    let response = await makeReq(
      `/api/products/${editedProduct._id}`,
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
        //ProductData,
      }}
    >
      {" "}
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
