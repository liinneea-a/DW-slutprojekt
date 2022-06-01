import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useCart } from '../../../../context/CartContext';
import { CompleteButton } from '../../../CompleteButton';

interface Props {
  paymentModalOpen: boolean;
  setPaymentModal: any;
}

const validationSchema = yup.object({
  // number: yup.number().required("Please enter number").min(10),
  number: yup
    .string()
    .typeError('Not a valid phone number. Example: 0738986845')
    .max(10, 'Not a valid phone number. Example: 0738986845')
    .matches(/([0-9]{10})/, 'Not a valid phone number. Example: 0738986845')
    .required('Phone number date is required'),
});

function Swish(props: Props) {
  const { deliveryInfo, setDeliveryInfo } = useCart();

  const navigate = useNavigate();
  const { cart, clearCart, newPurchaseTotal } = useCart();
  const closeModal = () =>
    setTimeout(() => {
      props.setPaymentModal(false);
      navigate('/purchasecomplete');
    }, 5000);

  const formik = useFormik({
    initialValues: {
      number: deliveryInfo.number,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      let newObject = deliveryInfo;
      newObject.paymentMethod = 'Swish';
      setDeliveryInfo(newObject);
      props.setPaymentModal(true);
      console.log(props.paymentModalOpen);
      closeModal();
      // addPurchaseList(cart);
      // newPurchaseTotal(totalPrice);
      clearCart();
    },
  });
  
  return (
    <div style={swishForm}>
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={formik.handleSubmit}>
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
        <CompleteButton paymentMethod={'Swish'} />
      </form>
    </div>
  );
}

export default Swish;

const swishForm: CSSProperties = {
  margin: '0 1rem',
};

const textFieldStyle: CSSProperties = {
  marginBottom: '1rem',
};

const completePurchaseButton: CSSProperties = {
  marginTop: '1rem',
  marginBottom: '1rem',
  background: '#2081e2',
};
