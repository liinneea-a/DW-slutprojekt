// @ts-ignore

import { createContext, FC, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../../server/resources';
// import { Product } from '../data/collections/collection';


interface CartContext {
  purchaseList: Product[];
  cart: Product[];
  addProductToCart: (item: Product) => void;
  incQty: (itemID: number) => void;
  decQty: (itemID: number) => void;
  clearCart: () => void;
  addPurchaseList: (list: Product[]) => void;
  totalPrice: number;
  calculatePrice: Function;
  purchaseTotal: number;
  newPurchaseTotal: (total: number) => void;
}

export const CartContext = createContext<CartContext>({
  purchaseList: [],
  addPurchaseList: (list: Product[]) => {},
  cart: [],
  addProductToCart: (item: Product) => {},
  incQty: (itemID: number) => {},
  decQty: (itemID: number) => {},
  clearCart: () => {},
  totalPrice: 1,
  calculatePrice: () => 0,
  purchaseTotal: 1,
  newPurchaseTotal: (total: number) => {},
});

export const CartProvider: FC = (props) => {
  let localData = localStorage.getItem('cart');
  const [cart, setCart] = useState<Product[]>(
    localData ? JSON.parse(localData) : []
  );
  const [purchaseList, setPurchaseList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [purchaseTotal, setPurchaseTotal] = useState(1);

  const addPurchaseList = (list: Product[]) => {
    setPurchaseList(list);
  };

  const newPurchaseTotal = (total: number) => {
    setPurchaseTotal(total);
  };

  const calculatePrice = () => {
    let sum = 0;
    for (let item of cart){
      sum += item.price * item.quantity!
    }
    setTotalPrice(sum);
    return sum
  }

  const addProductToCart = (item: Product) => {
    toast.success('Item added to cart', {
      position: 'bottom-left',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
    });

    let newCart = cart;
    let foundItem = newCart.find((cartItem: Product) => cartItem.id === item?.id);

    if (foundItem) {
      foundItem.quantity! += 1;
    } else {
        item.quantity = 1;
        newCart.push(item);
      }

    setCart(newCart);
    calculatePrice();
    localStorage.setItem('cart', JSON.stringify(newCart));

  };

  const incQty = (itemID: number) => {
    let updatedList = cart.map((item: any) => {
      if (item.id === itemID) {
        item.count += 1;
      }
      return item;
    });
    setCart(updatedList);
    calculatePrice();
    localStorage.setItem('cart', JSON.stringify(updatedList));
  };

  const decQty = (itemID: number) => {
    // let updatedList = cart.filter((item: Product) => {
    //   if (item.id === itemID) {
    //     if (item.count > 1) {
    //       item.count -= 1;
    //       return item;
    //     } else {
    //       item.count = 0;
    //     }
    //   } else {
    //     return item;
    //   }
    // })!;
    // setCart(updatedList);
    // setTotalPrice(cart.reduce((sum, nft) => sum + nft.price * nft.count, 0));
    calculatePrice();
    // localStorage.setItem('cart', JSON.stringify(updatedList));
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return (
    <CartContext.Provider
      value={{
        addPurchaseList,
        purchaseList,
        cart,
        addProductToCart,
        incQty,
        decQty,
        clearCart,
        totalPrice,
        calculatePrice,
        purchaseTotal,
        newPurchaseTotal,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
