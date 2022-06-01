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
  setSelectedShipping: React.Dispatch<React.SetStateAction<Shipper>>
  selectedShipping?: Shipper;
  getAllShippers: () => Promise<any>;
}

export const ShipperContext = createContext<ShipperContext>({
  setSelectedShipping: () => void {},
  getAllShippers: async () => void [],
});

export const ShipperProvider: FC = (props) => {
  const [selectedShipping, setSelectedShipping] = useState<Shipper>({shipper: "", cost: 0, daysToDelivery: 0});


  
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
