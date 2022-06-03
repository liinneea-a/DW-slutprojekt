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
      props.setPaymentModal(true);
      closeModal();
    },
  });

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    formik.handleSubmit();
  }
  
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
        <button style={completePurchaseButton} type="submit">
           <CompleteButton paymentMethod={'Swish'}/>
        </button>
       
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
  color: 'transparent',
  margin: 0,
  padding: 0,
  display: 'flex',
  border: 'none',
  borderRadius: '2rem',
  marginBottom: '1rem',
};
