import { createContext, FC, useContext, useState } from 'react';
import { Order } from '../../../server/resources/';
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
  const { loggedInUser } = useUser();

  const getAllOrders = async () => {
    if (!loggedInUser) {
      return console.log("No logged in user");
    }

    let listOfOrders = [];

    try {
      let { data, ok } = await makeReq(`/api/orders`, 'GET');

      if (ok) {
        listOfOrders = data;

        if (loggedInUser.isAdmin) {
          setOrders(data);
          return;
        }

        if (!loggedInUser.isAdmin) {
          let myOrders = listOfOrders.filter((order: Order) => {
            let customer = order.customer.toString();
            if (customer === loggedInUser.id) {
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
