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
  selectedShipping: Shipper;
  getAllShippers: () => Promise<any>;
}

// useEffect(() => {
//   getAllShippers();
// })

export const ShipperContext = createContext<ShipperContext>({
  setSelectedShipping: () => {},
  selectedShipping: { shipper: '', cost: 0, daysToDelivery: 0 },
  getAllShippers: async () => void [],
});

export const ShipperProvider: FC = (props) => {
  const [selectedShipping, setSelectedShipping] = useState<any>({
    shipper: '',
    cost: 0,
    daysToDelivery: 0,
  });

  useEffect(() => {
    console.log(selectedShipping);
  }, [selectedShipping]);

  const getAllShippers = async () => {
    try {
      let { data, ok } = await makeReq('/api/shipper', 'GET');

      console.log(data);

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
