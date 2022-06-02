// import { Order } from "@server/types";
import { createContext, FC, useContext, useState } from "react";
import { json } from "stream/consumers";
import { Order } from "../../../server/resources/";
//import { Order } from '../../../server/shared/types';
import { makeReq } from "../helper";

interface OrderContext {
  orders: Order[];
  getAllOrders: () => Promise<any>;
  markOrder: (order: Order) => void;
}

export const OrdersContext = createContext<OrderContext>({
  orders: [],
  getAllOrders: async () => void [],
  markOrder: () => {},
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

  const markOrder = async (order: Order) => {
    try {
      let { data, ok } = await makeReq(`/api/order/${order.id}`, "PUT", order);
      if (ok) {
        return data;
      } else {
        console.log(data);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <OrdersContext.Provider value={{ orders, getAllOrders, markOrder }}>
      {props.children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
