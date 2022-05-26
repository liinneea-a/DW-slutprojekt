import { CSSProperties, useContext } from "react";
import { ShipperContext } from "../../context/ShipperContext";
import { DeliveryDataInfo } from "../../data/collections/deliveryData";

interface Props {
  deliveryInfo: DeliveryDataInfo;
  selectedShipping: {
    shipper: string, 
    cost: number,
    days: number,
  };
}


function DeliveryInfoTable(props: Props) {

  const { selectedShipping } =
  useContext(ShipperContext);
  
  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td>Name</td>
            <td style={tableDataStyle}>
              {props.deliveryInfo.firstName + " " + props.deliveryInfo.lastName}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td style={tableDataStyle}>{props.deliveryInfo.email}</td>
          </tr>
          <tr>
            <td>Phone#</td>
            <td style={tableDataStyle}>{props.deliveryInfo.number}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td style={tableDataStyle}>{props.deliveryInfo.address}</td>
          </tr>
          <tr>
            <td>Zipcode</td>
            <td style={tableDataStyle}>{props.deliveryInfo.zipCode}</td>
          </tr>
          <tr>
            <td>City</td>
            <td style={tableDataStyle}>{props.deliveryInfo.city}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td style={tableDataStyle}>{props.deliveryInfo.country}</td>
          </tr>
          <tr>
            <td>Delivery</td>
            <td style={tableDataStyle}>{props.selectedShipping.shipper}</td>
          </tr>
          <tr>
            <td>Payment method</td>
            <td style={tableDataStyle}>{props.deliveryInfo.paymentMethod}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryInfoTable;

const tableStyle: CSSProperties = { gap: "1rem" };

const tableDataStyle: CSSProperties = { paddingLeft: "1rem" };
