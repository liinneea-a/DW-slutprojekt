// @ts-ignore

import { createContext, FC, useContext, useState } from "react";
import { NftItem } from "../../data/collections/collection";
import { toast } from "react-toastify";

interface CartContext {
  purchaseList: NftItem[];
  cart: NftItem[];
  addProduct: (item?: NftItem) => void;
  incQty: (itemID: number) => void;
  decQty: (itemID: number) => void;
  clearCart: () => void;
  addPurchaseList: (list: NftItem[]) => void;
  totalPrice: number;
  purchaseTotal: number;
  newPurchaseTotal: (total : number) => void
  // purchaseTotal : number;
  // addPurchaseTotal: (plus: number) => void;
}

export const CartContext = createContext<CartContext>({
  purchaseList: [],
  addPurchaseList: (list: NftItem[]) => {},
  cart: [],
  addProduct: (item?: NftItem) => {},
  incQty: (itemID: number) => {},
  decQty: (itemID: number) => {},
  clearCart: () => {},
  totalPrice: 1,
  purchaseTotal: 1,
  newPurchaseTotal: (total : number) => {}
  // purchaseTotal: 1,
  // addPurchaseTotal: (plus : number) => {},
});

export const CartProvider: FC = (props) => {
  let localData = localStorage.getItem("cart");
  const [cart, setCart] = useState<NftItem[]>(
    localData ? JSON.parse(localData) : []
  );
  const [purchaseList, setPurchaseList] = useState<NftItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((sum, nft) => sum + nft.price * nft.count, 0)
  );
  const [purchaseTotal, setPurchaseTotal] = useState(1)
  // const [purchaseTotal, setPurchaseTotal] = useState(purchaseList.reduce((sum, nft) => sum + nft.price * nft.count, 0))

  const addPurchaseList = (list: NftItem[]) => {
    setPurchaseList(list);
    // setPurchaseTotal(totalPrice);
  };

  const newPurchaseTotal = (total : number) => {setPurchaseTotal(total)}

  const addProduct = (item?: NftItem) => {
    toast.success("Item added to cart", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
    });
    let NewProductList = cart;
    let foundItem = NewProductList.find(
      (listedItem: any) => listedItem.NFTid === item?.NFTid
    );
    if (foundItem) {
      foundItem.count += 1;
    } else {
      if (item) {
        item.count = 1;
      }
      NewProductList.push(
        item || {
          NFTid: 12,
          image: "blabla",
          price: 12,
          description: "bla",
          count: 1,
          collectionID: 1,
        }
      );
    }
    setCart(NewProductList);
    setTotalPrice(cart.reduce((sum, nft) => sum + nft.price * nft.count, 0));
    localStorage.setItem("cart", JSON.stringify(NewProductList));
  };

  const incQty = (itemID: number) => {
    let updatedList = cart.map((item: any) => {
      if (item.NFTid === itemID) {
        item.count += 1;
      }
      return item;
    });
    setCart(updatedList);
    setTotalPrice(cart.reduce((sum, nft) => sum + nft.price * nft.count, 0));
    localStorage.setItem("cart", JSON.stringify(updatedList));
  };

  const decQty = (itemID: number) => {
    let updatedList = cart.filter((item: NftItem) => {
      if (item.NFTid === itemID) {
        if (item.count > 1) {
          item.count -= 1;
          return item;
        } else {
          item.count = 0;
        }
      } else {
        return item;
      }
    })!;
    setCart(updatedList);
    setTotalPrice(cart.reduce((sum, nft) => sum + nft.price * nft.count, 0));
    localStorage.setItem("cart", JSON.stringify(updatedList));
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        addPurchaseList,
        purchaseList,
        cart,
        addProduct,
        incQty,
        decQty,
        clearCart,
        totalPrice,
        purchaseTotal,
        newPurchaseTotal,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
