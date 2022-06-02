import { createContext, FC, useContext, useEffect, useState } from 'react';
import { getAllShippers, Shipper } from '../../../server/resources';
import { makeReq } from '../helper';
//import type {ClientShipper} from "@server/types"

interface ShipperContext {
  // setSelectedShipping: Function;
  // selectedShipping: Shipper;
  getAllShippers: () => Promise<any>;
}

export const ShipperContext = createContext<ShipperContext>({
  // setSelectedShipping: () => void {},
  // selectedShipping: {cost: 0, deliveryDays: 0, shipper: ""},
  getAllShippers: async () => void [],
});

export const ShipperProvider = (props: any) => {
  // const [selectedShipping, setSelectedShipping] = useState<any>();

  const getAllShippers = async () => {
    try {
      let { data, ok } = await makeReq('/api/shipper', 'GET');

      if (ok) {
        return data;
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <ShipperContext.Provider
      value={{
        getAllShippers,
        // setSelectedShipping,
        // selectedShipping,
      }}
    >
      {props.children}
    </ShipperContext.Provider>
  );
};

export const useShipper = () => useContext(ShipperContext);
