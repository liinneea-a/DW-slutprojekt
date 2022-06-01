// import { Order } from "@server/types";
import { createContext, FC, useContext, useState } from "react";
import { Order } from "../../../server/resources/";
//import { Order } from '../../../server/shared/types';
import { makeReq } from "../helper";

interface OrderContext {
  orders: Order[];
  getAllOrders: () => Promise<any>;
  sendOrder: (order: Order) => void;
}

export const OrdersContext = createContext<OrderContext>({
  orders: [],
  getAllOrders: async () => void [],
  sendOrder: () => {},
});

export const OrderProvider: FC = (props) => {
  const [orders, setOrders] = useState<Order[]>([]);
  // const [selectedOrder, setSelectedOrder] = useState<Order[]>([])

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

  const sendOrder = async (order: Order) => {
    try {
      let { data, ok } = await makeReq(
        `/api/orders/${order.id}`,
        "PUT",
        {isSent: false}
      );
      if (ok) {
        return data;
      }else {
        console.log(data)
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, getAllOrders, sendOrder }}>
      {props.children}
    </OrdersContext.Provider>
  );
};  

export const useOrders = () => useContext(OrdersContext);
