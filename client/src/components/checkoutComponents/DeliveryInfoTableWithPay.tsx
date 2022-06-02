import { CSSProperties, useContext } from "react";
import { useCart } from "../../context/CartContext";
import { ShipperContext } from "../../context/ShipperContext";
import { DeliveryDataInfo } from "../../data/collections/deliveryData";


function DeliveryInfoTable() {

  const { deliveryInfo, setDeliveryInfo } = useCart(); 

  const { selectedShipping } =
  useContext(ShipperContext);
  
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
            <td style={tableDataStyle}>{selectedShipping!.shipper}</td>
          </tr>
          <tr>
            <td>Payment method</td>
            <td style={tableDataStyle}>{deliveryInfo.paymentMethod}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryInfoTable;

const tableStyle: CSSProperties = { gap: "1rem" };

const tableDataStyle: CSSProperties = { paddingLeft: "1rem" };
