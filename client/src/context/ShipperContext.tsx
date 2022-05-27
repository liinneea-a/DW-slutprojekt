import { createContext, FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import { number, string } from "yup";
import { makeReq } from "../helper";
//import type {ClientShipper} from "@server/types"

interface ShipperContext {
  setSelectedShipping: React.Dispatch<React.SetStateAction<any[]>>;
  selectedShipping: {
    /* shipper: string, 
    cost: number,
    days: number, */
  };
  getAllShippers: () => Promise<any>;
}

export const ShipperContext = createContext<ShipperContext>({
  setSelectedShipping: () => undefined,
  selectedShipping: {
    /* shipper: string, 
    cost: number,
    days: number,  */
  },
  getAllShippers: async () => void [],
});

export const ShipperProvider: FC = (props) => {
  const [selectedShipping, setSelectedShipping] = useState({
    /* shipper: string, cost: number, days: number */
  });

  console.log(selectedShipping);

  const getAllShippers = async () => {
    try {
      let response = await makeReq("/api/shipper", "GET");
      console.log(response);
      return response;
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
