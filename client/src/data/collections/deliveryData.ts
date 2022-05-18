export interface DeliveryDataInfo {
  firstName: string;
  lastName: string;
  email: string;
  deliveryMethod: string;
  number: number;
  address: string;
  zipCode: number;
  city: string;
  country: string;
  paymentMethod: string;
}

export const DeliveryDataInfoObject: DeliveryDataInfo = {
  firstName: "",
  lastName: "",
  email: "",
  deliveryMethod: "",
  number: 1,
  address: "",
  zipCode: 1,
  city: "",
  country: "",
  paymentMethod: "",
};