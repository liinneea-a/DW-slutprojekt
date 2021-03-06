import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCart } from "../../../../context/CartContext";
import { CompleteButton } from "../../../CompleteButton";

interface Props {
  paymentModalOpen: boolean;
  setPaymentModal: any;
}

const validationSchema = yup.object({
  CardNumber: yup.number().required("Enter credit card number").min(16),
  Cvc: yup.number().required("Enter CVC number").min(3),
  CardHolder: yup
    .string()
    .typeError("Not a name")
    .matches(/([a-ö\s]+$)/, "No numbers in a name unless you are Elons son")
    .required("Enter card holders name"),
  ExpMonth: yup
    .string()
    .typeError("Not a valid expiration date. Example: MM")
    .max(2, "Not a valid expiration date. Example: MM")
    .matches(/([0-9]{2})/, "Not a valid expiration date. Example: MM")
    .required("Expiration date is required"),
  ExpYear: yup
    .string()
    .typeError("Not a valid expiration date. Example: YY")
    .max(4, "Not a valid expiration date. Example: YY")
    .matches(/([0-9]{2})/, "Not a valid expiration date. Example: YY")
    .required("Expiration date is required"),
});

function CreditCard(props: Props) {
  const { deliveryInfo, setDeliveryInfo } = useCart(); 

  const navigate = useNavigate();
  const { cart, clearCart, newPurchaseTotal } =
    useCart();
  const closeModal = () =>
    setTimeout(() => {
      props.setPaymentModal(false);
      navigate("/purchasecomplete");
    }, 5000);

  const formik = useFormik({
    initialValues: {
      CardNumber: "",
      ExpMonth: "",
      ExpYear: "",
      Cvc: "",
      CardHolder: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      let newObject = deliveryInfo;
      newObject.paymentMethod = "Card";
      setDeliveryInfo(newObject);
      props.setPaymentModal(true);
      clearCart();
      closeModal();
    }

  });

    const handleOnSubmit = (e: any) => {
      e.preventDefault();
      formik.handleSubmit();
    }

  return (
    <div style={creditCardForm}>
      <form style={formStyle} onSubmit={(e) => handleOnSubmit(e)}>
        <TextField
          style={CardHolderStyle}
          fullWidth
          id="CardHolder"
          name="CardHolder"
          label="Card Holder"
          value={formik.values.CardHolder}
          onChange={formik.handleChange}
          error={formik.touched.CardHolder && Boolean(formik.errors.CardHolder)}
          helperText={formik.touched.CardHolder && formik.errors.CardHolder}
        />
        <div style={numberAndCvcContainer}>
          <TextField
            style={textFieldStyleCard}
            id="CardNumber"
            name="CardNumber"
            label="Card Number"
            value={formik.values.CardNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.CardNumber && Boolean(formik.errors.CardNumber)
            }
            helperText={formik.touched.CardNumber && formik.errors.CardNumber}
          />
          <TextField
            style={textFieldStyleCvc}
            id="Cvc"
            name="Cvc"
            label="CVC"
            value={formik.values.Cvc}
            onChange={formik.handleChange}
            error={formik.touched.Cvc && Boolean(formik.errors.Cvc)}
            helperText={formik.touched.Cvc && formik.errors.Cvc}
          />
        </div>
        <div style={expDateContainer}>
          <TextField
            style={ExpStyle}
            id="ExpMonth"
            name="ExpMonth"
            label="Exp. month"
            value={formik.values.ExpMonth}
            onChange={formik.handleChange}
            error={formik.touched.ExpMonth && Boolean(formik.errors.ExpMonth)}
            helperText={formik.touched.ExpMonth && formik.errors.ExpMonth}
          />
          <TextField
            style={ExpStyle}
            id="ExpYear"
            name="ExpYear"
            label="Exp. year"
            value={formik.values.ExpYear}
            onChange={formik.handleChange}
            error={formik.touched.ExpYear && Boolean(formik.errors.ExpYear)}
            helperText={formik.touched.ExpYear && formik.errors.ExpYear}
          />
        </div>

        <CompleteButton paymentMethod={"Card"} />
      </form>
    </div>
  );
}

export default CreditCard;

const formStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const creditCardForm: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  paddingBottom: '1rem'
};

const textFieldStyleCard: CSSProperties = { width: "70%" };
const textFieldStyleCvc: CSSProperties = { width: "30%" };

const numberAndCvcContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "1rem",
  width: '80%'
};

const CardHolderStyle: CSSProperties = {
  marginBottom: "1rem",
  width: "80%",
};

const expDateContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: '100%',
  paddingBottom: '1rem'
};

const ExpStyle: CSSProperties = {
  width: "40%",
};

const completePurchaseButton: CSSProperties = {
  marginTop: "1rem",
  marginBottom: "1rem",
  width: "60%",
};
