import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useEffect, useState } from "react";
import DeliveryInfoTable from "../components/checkoutComponents/DeliveryInfoTable";
import PaymentBox from "../components/checkoutComponents/payment/paymentBox";
import TotalSumWithShipping from "../components/checkoutComponents/payment/TotalSumWithShipping";
import { StartPageButton } from "../components/StartPageButton";
import { useCart } from "../context/CartContext";
import { useShipper } from "../context/ShipperContext";

interface Props {
  finalTotalSum: number;
  setFinalTotalSum: any;
}

// const navigate = useNavigate();

function PaymentPage(props: Props) {
  const { selectedShipping } = useCart();

// const { selectedShipping } = useShipper();

  useEffect(() => {
     console.log(selectedShipping);
  })
 


  const handleChange = (event: any) => {
    setPaymentOption(event.target.value);
  };
  
  const formik = useFormik({
    initialValues: {
      paymentOption: "",
    },
    onSubmit: (values) => {
      // navigate("/PaymentPage");
    },
  });
  const [paymentOption, setPaymentOption] = useState("");
  const [finalTotalSum, setFinalTotalSum] = useState(1);

  return (
    <>
    <StartPageButton />
      <div style={checkoutContainer}>
        <h2 style={headlineStyle}>Checkout</h2>
        <div>
          <DeliveryInfoTable />
        </div>
        <div>
          <TotalSumWithShipping />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <h2 style={paymentDetailsTextStyle}>Payment details</h2>
          <Box style={boxStyle}>
            <FormControl fullWidth>
              <InputLabel id="deliveryOption">Payment option</InputLabel>
              <Select
                labelId="paymentOption"
                id="paymentOption"
                value={paymentOption}
                label="Payment Option"
                onChange={handleChange}
              >
                <MenuItem value={"swish"}>Swish </MenuItem>
                <MenuItem value={"card"}>Card</MenuItem>
                <MenuItem value={"invoice"}>Invoice</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </form>
        <PaymentBox paymentOption={paymentOption} />
      </div>
      </>
  );
}

export default PaymentPage;

const checkoutContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#303339",
  boxShadow: "2px 5px 12px black",
  marginBottom: "2rem",
  fontSize: "clamp(2vmin, 3.2vmin, 1.2rem)",
  minWidth: '65%',
  width: '18rem'
};

const headlineStyle: CSSProperties = {
  fontSize: "2rem",
};

const paymentDetailsTextStyle: CSSProperties = { textAlign: "center" };

const boxStyle: CSSProperties = { minWidth: "250px",
display: 'flex',
alignItems: 'center' };
