// import { Order } from "@server/types";
import { createContext, FC, useContext, useState } from "react";
import { Order } from '../../../server/shared/types';
import { makeReq } from "../helper";

interface OrderContext {
    orders: Order[];
    getAllOrders: () => Promise<any>
    updateOrder: () => Promise<any>
}

export const OrdersContext = createContext<OrderContext>({
    orders: [],
    getAllOrders: async () => void [],
    updateOrder: async () => void []
})

export const OrderProvider: FC = (props) => {
    const [orders, setOrders] = useState<Order[]>([]);

    const getAllOrders = async () => {
        try {
          let { data, ok } = await makeReq("/api/orders", "GET");
          if (ok) {
            setOrders(data);
            return true;
          }
        } catch (err) {
          return console.log(err);
        }
      };

    const updateOrder = async () => {
        try {
          let { data, ok } = await makeReq("/api/orders", "PUT");
          if (ok) {
            setOrders(data);
            return true;
          }
        } catch (err) {
          return console.log(err);
        }
      };

      return (
          <OrdersContext.Provider value={{orders, getAllOrders, updateOrder}}>{props.children}</OrdersContext.Provider>
      );
}

export const useOrders = () => useContext(OrdersContext)