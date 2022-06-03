// import { Order } from "@server/types";
import { ok } from 'assert';
import { createContext, FC, useContext, useState } from 'react';
import { json } from 'stream/consumers';
import { Order, OrderModel } from '../../../server/resources/';
//import { Order } from '../../../server/shared/types';
import { makeReq } from '../helper';
import { useUser } from './UserContext';

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
  const { loggedInUser } = useUser();

  const getAllOrders = async () => {
    if (!loggedInUser) {
      return console.log("No logged in user");
    }

    console.log(loggedInUser);
    let listOfOrders = [];

    try {
      let { data, ok } = await makeReq(`/api/orders`, 'GET');

      if (ok) {
        listOfOrders = data;

        if (loggedInUser.isAdmin) {
          console.log('user is admin and get all orders');
          setOrders(data);
          return;
        }

        if (!loggedInUser.isAdmin) {
          console.log('user is not admin and gets own orders');

          let myOrders = listOfOrders.filter((order: Order) => {
            let customer = order.customer.toString();
            if (customer === loggedInUser.id) {
              console.log(order);
              return order;
            }
          });
          setOrders(myOrders);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const markOrder = async (order: Order) => {
    try {
      let { data, ok } = await makeReq(`/api/order/${order.id}`, 'PUT', order);
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
