import { createContext, useContext } from 'react';
import { makeReq } from '../helper';

interface ShipperContext {
  getAllShippers: () => Promise<any>;
}

export const ShipperContext = createContext<ShipperContext>({
  getAllShippers: async () => void [],
});

export const ShipperProvider = (props: any) => {

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
      }}
    >
      {props.children}
    </ShipperContext.Provider>
  );
};

export const useShipper = () => useContext(ShipperContext);
