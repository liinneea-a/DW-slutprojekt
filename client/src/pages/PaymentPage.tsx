import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties, useState } from "react";
import DeliveryInfoTable from "../components/checkoutComponents/DeliveryInfoTable";
import { DeliveryDataInfo } from "../data/collections/deliveryData";
import PaymentBox from "../components/checkoutComponents/payment/paymentBox";
import TotalSumWithShipping from "../components/checkoutComponents/payment/TotalSumWithShipping";

interface Props {
  deliveryInfo: DeliveryDataInfo;
  setDeliveryInfo: any;
  finalTotalSum: number;
  setFinalTotalSum: any;
}

// const navigate = useNavigate();

function PaymentPage(props: Props) {
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
    <div style={rootStyle}>
      <div style={checkoutContainer}>
        <h2 style={headlineStyle}>Checkout</h2>
        <div>
          <DeliveryInfoTable deliveryInfo={props.deliveryInfo} />
        </div>
        <div>
          <TotalSumWithShipping
            deliveryInfo={props.deliveryInfo}
            finalTotalSum={finalTotalSum}
            setFinalTotalSum={setFinalTotalSum}
          />
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
        <PaymentBox
          paymentOption={paymentOption}
          deliveryInfo={props.deliveryInfo}
          setDeliveryInfo={props.setDeliveryInfo}
        />
      </div>
    </div>
  );
}

export default PaymentPage;

const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  width: "100%",
  // border: "2px solid #88D9E6",
};

const checkoutContainer: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "80%",
  background: "#303339",
  boxShadow: "2px 5px 12px black",
  marginBottom: "2rem",
  fontSize: "clamp(2vmin, 3.2vmin, 1.2rem)",
};

const headlineStyle: CSSProperties = {
  fontSize: "2rem",
};

const paymentDetailsTextStyle: CSSProperties = { textAlign: "center" };

const boxStyle: CSSProperties = { minWidth: 250 };
