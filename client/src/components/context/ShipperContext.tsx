import { createContext, FC, useContext, useState } from "react";
import { toast } from "react-toastify";

interface ShipperContext {
  setSelectedShipping: React.Dispatch<React.SetStateAction<any[]>>,
   selectedShipping: {},
   //deliveryDate: (""), 
    getAllShippers: () => Promise<any>
}

export const ShipperContext = createContext<ShipperContext>({
  setSelectedShipping: () => undefined,
  selectedShipping: {},
  //deliveryDate: () => undefined, 
  getAllShippers: async () => void[] 
});

export const ShipperProvider: FC = (props) => {
    const [selectedShipping, setSelectedShipping] = useState({});
    //const [deliveryDate, setDeliveryDate] = useState<string>("");


    const getAllShippers = async () => {
        const response = await fetch("/api/shipper");
        const result = await Promise.resolve(response.json());
        const shippers: String[] = result;
        return shippers;
      }
  
  return (
    <ShipperContext.Provider
      value={{
          getAllShippers,
          setSelectedShipping,
          selectedShipping,
          //deliveryDate,
          //setDeliveryDate, 
      }}
    >
      {props.children}
    </ShipperContext.Provider>
  );
};

export const useShipper = () => useContext(ShipperContext);