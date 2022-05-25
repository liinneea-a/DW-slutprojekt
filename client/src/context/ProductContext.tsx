import { createContext, FC, useContext, useState } from "react";
import { productData, productDataItem } from "../data/collections/dataTest";

interface ProductContext {
  products: productDataItem[];
  getAllProducts: () => void;
  addProduct: (product: productDataItem) => void;
  removeProduct: (productID: number) => void;
  editProduct: (product: productDataItem) => void;
}

const ProductsContext = createContext<ProductContext>({
  products: [],
  addProduct: (product: productDataItem) => {},
  getAllProducts: () => {},
  removeProduct: (productID: number) => {},
  editProduct: (product: productDataItem) => {},
});

export const ProductProvider: FC = (props) => {
  let localData = localStorage.getItem("products");
  const [products, setProducts] = useState(
    localData ? JSON.parse(localData) : productData
  );

  const getAllProducts = async () => {
    const response = await fetch("/api/testproduct");
    const result = await Promise.resolve(response.json);
    const products: String[] = result;
    return products;
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
        getAllProducts,
        products,
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
