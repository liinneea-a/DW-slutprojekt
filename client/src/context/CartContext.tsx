
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//import { Order, Product } from '../../../server/resources';
import { ProductData } from '../ProductData';
import { shippperSchema } from '../../../server/resources/order/shipper.schema';

import { Product } from '../../../server/resources';

import {
  DeliveryDataInfo, DeliveryDataInfoObject
} from "../data/collections/deliveryData";
import { makeReq } from "../helper";

interface CartContext {
  purchaseList: ProductData[];
  cart: ProductData[];
  addProductToCart: (item: ProductData) => void;
  incQty: (itemID: string) => void;
  decQty: (itemID: string) => void;
  clearCart: () => void;
  sendOrder: () => void;
  totalPrice: number;
  calculatePrice: Function;
  purchaseTotal: number;
  newPurchaseTotal: (total: number) => void;
  deliveryInfo: DeliveryDataInfo;
  setDeliveryInfo: Function;
  id: string,
  setSelectedShipping: Function;
  selectedShipping: any;
  
}

export const CartContext = createContext<CartContext>({
  purchaseList: [],
  sendOrder: () => {},
  cart: [],
  addProductToCart: (item: ProductData) => {},
  incQty: (itemID: string) => {},
  decQty: (itemID: string) => {},
  clearCart: () => {},
  totalPrice: 0,
  calculatePrice: () => 0,
  purchaseTotal: 1,
  newPurchaseTotal: (total: number) => {},
  deliveryInfo: DeliveryDataInfoObject,
  setDeliveryInfo: () => {},
  id: "",
  setSelectedShipping: () => void {},
  selectedShipping: {}
});

export const CartProvider: FC = (props) => {

  let localData = localStorage.getItem('cart');
  const [cart, setCart] = useState<ProductData[]>(
/*
  let localData = localStorage.getItem("cart");
  const [cart, setCart] = useState<Product[]>(
*/
    localData ? JSON.parse(localData) : []
  );
  const [purchaseList, setPurchaseList] = useState<ProductData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [purchaseTotal, setPurchaseTotal] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState(DeliveryDataInfoObject);
  const [selectedShipping, setSelectedShipping] = useState<any>();
  
  const [id, setId] = useState("");

  useEffect(() => {
  }, [cart]);

  useEffect(() => {
  }, [totalPrice])

  useEffect(() => {
  }, [selectedShipping])

  const sendOrder = async () => {
    
    let sum = calculatePrice();

    const address = {
      fullname: deliveryInfo.firstName + " " + deliveryInfo.lastName,
      street: deliveryInfo.address,
      zipcode: deliveryInfo.zipCode,
      city: deliveryInfo.city,
    };

    const order = {
      products: cart,
      shipper: selectedShipping,
      deliveryAddress: address,
      paymentMethod: deliveryInfo.paymentMethod,
      totalPrice: sum
    };

    try {
      const { data, ok } = await makeReq('/api/order', 'POST', order);
      setId(data.id);

      if (ok) {
        for (let product of cart) {
          product.stock -= product.quantity!;
          const { data, ok } = await makeReq(
            `/api/products/${product.id}`,
            "PUT",
            product
          );
        }
      }
    } catch (err) {
      return console.log(err);
    }
  };
  const newPurchaseTotal = (total: number) => {
    setPurchaseTotal(total);
  };

  const calculatePrice = () => {
    let sum = 0;

    for (let item of cart) {
      sum += item.price * item.quantity!;
    }
    setTotalPrice(sum);
    return sum;
  };


  const addProductToCart = (item: ProductData) => {
    toast.success('Item added to cart', {
      position: 'bottom-left',
/*
  const addProductToCart = (item: Product) => {
    toast.success("Item added to cart", {
      position: "bottom-left",
*/
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
    });

    let newCart = cart;
    let foundItem = newCart.find(
      (cartItem: ProductData) => cartItem.id === item?.id
    );

    if (foundItem) {
      foundItem.quantity! += 1;
    } else {
      item.quantity = 1;
      newCart.push(item);
    }

    setCart(newCart);
    calculatePrice();
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const incQty = (itemID: string) => {
    let updatedList = cart.map((item: ProductData) => {
      if (item.id === itemID) {
        item.quantity! += 1;
      }
      return item;
    });
    setCart(updatedList);
    calculatePrice();
    localStorage.setItem("cart", JSON.stringify(updatedList));
  };

  const decQty = (itemID: string) => {
    let updatedList = cart.filter((item: ProductData) => {
      if (item.id === itemID) {
        if (item.quantity! > 1) {
          item.quantity! -= 1;
          return item;
        } else {
          item.quantity! = 0;
        }
      } else {
        return item;
      }
    })!;
    setCart(updatedList);
    calculatePrice();
    localStorage.setItem("cart", JSON.stringify(updatedList));
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        sendOrder,
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
        deliveryInfo,
        setDeliveryInfo,
        id,
        setSelectedShipping,
        selectedShipping,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
