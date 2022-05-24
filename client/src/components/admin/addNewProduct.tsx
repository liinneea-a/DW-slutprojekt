import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { useProducts } from "../../context/ProductContext";
import { productDataItem } from "../../data/collections/dataTest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewProduct(props: Props) {
  const { addProduct } = useProducts();
  const formik = useFormik({
    initialValues: {
      productID: 0,
      image: "",
      price: 0,
      description: "",
      count: 0,
      categories: 0,
    },
    onSubmit: (values) => {
      let newProduct: productDataItem = {
        productID: values.productID,
        image: values.image,
        price: values.price,
        description: values.description,
        count: values.count,
        categories: values.categories,
      };
      addProduct(newProduct);
      formik.resetForm();
      props.onClose();
    },
  });

  if (!props.isOpen) return null;

  return (
    <div style={newProductContainer}>
      <div>
        <form style={formStyle} onSubmit={formik.handleSubmit}>
          <h3>Add new product</h3>
          <div style={textFieldsContainer}>
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="productID"
              name="productID"
              label="Product id"
              value={formik.values.productID}
              onChange={formik.handleChange}
              error={formik.touched.productID && Boolean(formik.errors.productID)}
              helperText={formik.touched.productID && formik.errors.productID}
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="description"
              name="description"
              label="Product description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="productImage"
              name="productImage"
              label="Product Image URL"
              value={formik.values.image}
              onChange={formik.handleChange}
              error={
                formik.touched.image &&
                Boolean(formik.errors.image)
              }
              helperText={
                formik.touched.image && formik.errors.image
              }
            />
          </div>
          <Button
            style={addNewProductButton}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Add new product
          </Button>
          <Button
            style={closeWindowButton}
            color="primary"
            variant="contained"
            fullWidth
            onClick={props.onClose}
          >
            Close window
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddNewProduct;

const newProductContainer: CSSProperties = {
  backgroundColor: "black",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#202225",
  border: "2px solid #000",
  zIndex: "9001",
  //   boxShadow: 24,
  textAlign: "center",
  width: "clamp(10rem, 90vmin, 40rem",
};

const addNewProductButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
};

const closeWindowButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
};

const textFieldStyle: CSSProperties = {
  marginBottom: "1rem",
  width: "100%",
};

const formStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "column",
};

const textFieldsContainer: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "90%",
  margin: "1rem",
};
