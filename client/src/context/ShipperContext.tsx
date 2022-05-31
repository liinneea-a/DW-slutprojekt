import { createContext, FC, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { number, string } from 'yup';
import { getAllShippers } from '../../../server/resources';
import { makeReq } from '../helper';
//import type {ClientShipper} from "@server/types"

interface Shipper {
  shipper: string;
  cost: number;
  daysToDelivery: number;
}

interface ShipperContext {
  setSelectedShipping: Function;
  selectedShipping: Shipper | any;
  getAllShippers: () => Promise<any>;
}

// useEffect(() => {
//   getAllShippers();
// })

export const ShipperContext = createContext<ShipperContext>({
  setSelectedShipping: () => void {},
  getAllShippers: async () => void [],
  selectedShipping: ''
});

export const ShipperProvider: FC = (props) => {

  const [selectedShipping, setSelectedShipping] = useState<string>('');

  useEffect(() => {
    
  });

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
        setSelectedShipping,
        selectedShipping,
      }}
    >
      {props.children}
    </ShipperContext.Provider>
  );
};

export const useShipper = () => useContext(ShipperContext);
