import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCart } from "../../context/CartContext";
import { ShipperContext, useShipper } from "../../context/ShipperContext";
import { DeliveryDataInfo } from "../../data/collections/deliveryData";
import DeliveryBox from "../checkoutComponents/shipping/deliveryBox";


const validationSchema = yup.object({
  firstName: yup.string().required("Please enter first name").min(2),
  lastName: yup.string().required("Please enter last name").min(2),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  number: yup.number().required("Please enter number").min(10),
  zipCode: yup.number().required("Please enter zipcode").min(4),
  city: yup.string().required("Please enter your city").min(2),
  address: yup.string().required("Please enter your adress").min(8),
  country: yup.string().required("Please enter your country").min(2),
});

function CheckoutForm() {
  const [deliveryOption, setDeliveryOption] = useState("");
    const [shippers, setShippers] = useState([])

  const { deliveryInfo, setDeliveryInfo } = useCart(); 
  const { getAllShippers, selectedShipping, setSelectedShipping } = useShipper();
;

  const navigate = useNavigate();
  console.log(shippers);

  console.log(selectedShipping);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      deliveryMethod: "",
      address: "",
      zipCode: "",
      city: "",
      country: "",
      paymentMethod: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values, event) => {
      values.deliveryMethod = deliveryOption;
      setDeliveryInfo(values);
      console.log(values);
      navigate("/paymentpage");
    },

  });

  const handleChange = (event: any) => {
    console.log(selectedShipping)
  };

  const handleChangeShipping = (event: any) => {
    setSelectedShipping(event.target.value);
    console.log(selectedShipping);
  }


  const handleOnSubmit = (e: any) => {
    e.preventDefault();
  }


  async function getShippers() {
    const result =  await getAllShippers();
    setShippers(result);
    console.log(result);
  }

  useEffect(() => {
    getShippers();
  }, []);

  return (
    <div style={rootStyle}>
      <div style={detailFormContainer}>
        <h2>Shipment details</h2>
        <div>
          <form style={formStyle} onSubmit={(e) => {formik.handleSubmit}}>
            <div style={textFieldsContainer}>
              <TextField
                style={textFieldStyle}
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="number"
                name="number"
                label="Phone Number"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="address"
                name="address"
                label="Address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="zipCode"
                name="zipCode"
                label="Zip code"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="city"
                name="city"
                label="City"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                id="country"
                name="country"
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>

            <Box style={deliveryBox}>
              <h2>Delivery details</h2>
              <FormControl fullWidth>
                <InputLabel id="deliveryOption">Delivery Option</InputLabel>
                <Select
                  labelId="deliveryOptionLabel"
                  id="deliveryOption"
                  value={selectedShipping}
                  label="Delivery Option"
                  required
                  onChange={handleChangeShipping}
                >
                 {shippers.map((shipper: any) => {
                    return (
                      <MenuItem
                        value={shipper}
                        key={shipper._id}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <p style={{ width: "33%", fontWeight: "bold" }}>
                          {shipper.shipper}
                        </p>
                        <p style={{ width: "33%" }}>{shipper.days} days</p>
                        <p style={{ width: "33%" }}>{shipper.cost} SEK</p>
                      </MenuItem>
                    );
                  })} 
                </Select>
              </FormControl>
              <div style={deliveryBox}>
                <DeliveryBox deliveryOption={deliveryOption} />
              </div>
            </Box>

            <Button
              style={nextButtonStyle}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
  // border: "2px solid #88D9E6",
};

const detailFormContainer: CSSProperties = {
  color: "white",
  minWidth: "15rem",
  marginBottom: "2rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const textFieldStyle: CSSProperties = {
  marginBottom: "1rem",
  width: "40%",
  margin: ".5rem",
};

const formStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "column",
};

const deliveryBox: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minWidth: "60vmin",
  maxWidth: "3rem",
  textAlign: "center",
};

const textFieldsContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};

const nextButtonStyle: CSSProperties = {
  marginTop: "1rem",
  width: "40vmin",
  background: "#2081e2",
  fontWeight: "bold",
};
