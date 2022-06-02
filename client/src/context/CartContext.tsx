// @ts-ignore

import { SelfImprovement } from '@mui/icons-material';
import { ObjectId } from 'mongoose';
import { createContext, FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Order, Product } from '../../../server/resources';
import {
  DeliveryDataInfoObject,
  DeliveryDataInfo,
} from '../data/collections/deliveryData';
import { makeReq } from '../helper';
import { useShipper } from './ShipperContext';

interface CartContext {
  purchaseList: Product[];
  cart: Product[];
  addProductToCart: (item: Product) => void;
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
  id: string
}

export const CartContext = createContext<CartContext>({
  purchaseList: [],
  sendOrder: () => {},
  cart: [],
  addProductToCart: (item: Product) => {},
  incQty: (itemID: string) => {},
  decQty: (itemID: string) => {},
  clearCart: () => {},
  totalPrice: 0,
  calculatePrice: () => 0,
  purchaseTotal: 1,
  newPurchaseTotal: (total: number) => {},
  deliveryInfo: DeliveryDataInfoObject,
  setDeliveryInfo: () => {},
  id: ""
});

export const CartProvider: FC = (props) => {
  let localData = localStorage.getItem('cart');
  const [cart, setCart] = useState<Product[]>(
    localData ? JSON.parse(localData) : []
  );
  const [purchaseList, setPurchaseList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [purchaseTotal, setPurchaseTotal] = useState(1);
  const [deliveryInfo, setDeliveryInfo] = useState(DeliveryDataInfoObject);
  const { selectedShipping } = useShipper();
  const [id, setId] = useState("");

  useEffect(() => {
    console.log('cart: ', cart);
  }, [cart]);

  const sendOrder = async () => {
    console.log('in sendOrder');
    const address = {
      fullname: deliveryInfo.firstName + ' ' + deliveryInfo.lastName,
      street: deliveryInfo.address,
      zipcode: deliveryInfo.zipCode,
      city: deliveryInfo.city,
    };

    const order = {
      products: cart,
      shipper: { cost: 10, deliveryDays: 1, shipper: 'Postnord' },
      deliveryAddress: address,
      paymentMethod: deliveryInfo.paymentMethod,
    };
    console.log('order: ', order);
    console.log('del.paymentM: ', deliveryInfo.paymentMethod);

    try {
      const { data, ok } = await makeReq('/api/order', 'POST', order);
      setId(data.id);

      if (ok) {
        
        for (let product of cart) {
          console.log(product.stock);
          product.stock -= product.quantity!;
          console.log(product.stock);
          const { data, ok } = await makeReq(
            `/api/products/${product.id}`,
            'PUT',
            product
          );
          console.log(ok);
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
    let foundItem = newCart.find(
      (cartItem: Product) => cartItem.id === item?.id
    );

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

  const incQty = (itemID: string) => {
    let updatedList = cart.map((item: Product) => {
      if (item.id === itemID) {
        item.quantity! += 1;
      }
      return item;
    });
    setCart(updatedList);
    calculatePrice();
    localStorage.setItem('cart', JSON.stringify(updatedList));
  };

  const decQty = (itemID: string) => {
    let updatedList = cart.filter((item: Product) => {
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
    localStorage.setItem('cart', JSON.stringify(updatedList));
  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    localStorage.removeItem('cart');
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
        id
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
