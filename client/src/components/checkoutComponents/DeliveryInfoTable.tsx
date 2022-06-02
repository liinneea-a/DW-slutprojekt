import { CSSProperties, useContext } from "react";
import { DeliveryDataInfo } from "../../data/collections/deliveryData";
import { ShipperContext, useShipper } from "../../context/ShipperContext";
import { useCart } from "../../context/CartContext";




function DeliveryInfoTable() {
  const { deliveryInfo, setDeliveryInfo, selectedShipping  } = useCart(); 

  // const { selectedShipping } = useShipper();

  

  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td>Name</td>
            <td style={tableDataStyle}>
              {deliveryInfo.firstName + " " + deliveryInfo.lastName}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={tableDataStyle}>{deliveryInfo.email}</td>
          </tr>
          <tr>
            <td>Phone#</td>
            <td style={tableDataStyle}>{deliveryInfo.number}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td style={tableDataStyle}>{deliveryInfo.address}</td>
          </tr>
          <tr>
            <td>Zipcode</td>
            <td style={tableDataStyle}>{deliveryInfo.zipCode}</td>
          </tr>
          <tr>
            <td>City</td>
            <td style={tableDataStyle}>{deliveryInfo.city}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td style={tableDataStyle}>{deliveryInfo.country}</td>
          </tr>
          <tr>
            <td>Delivery</td>
            <td style={tableDataStyle}>{selectedShipping.shipper}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryInfoTable;

const tableStyle: CSSProperties = { gap: "1rem" };

const tableDataStyle: CSSProperties = { paddingLeft: "1rem" };
