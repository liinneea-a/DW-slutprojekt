import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import * as yup from "yup";
import { useProducts } from "../../context/ProductContext";
import { productDataItem } from "../../data/collections/dataTest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Please enter new name").min(1),
  description: yup.string().required("Please enter a new description").min(2),
  productImage: yup.string().required("Please enter a new image URL").min(10),
});

function EditProduct(props: Props) {
  const { editProduct } = useProducts();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productID: 0,
      image: "",
      price: 0,
      description: "",
      count: 0,
      categories: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let newProduct: productDataItem = {
        productID: values.productID,
        image: values.image,
        price: values.price,
        description: values.description,
        count: values.count,
        categories: values.categories,
      };
      // editProduct(newProduct);
      formik.resetForm();
      props.onClose();
    },
  });

  if (!props.isOpen) return null;

  return (
    <div>
      <div style={newProductContainer}>
        <div>
          <form style={formStyle} onSubmit={formik.handleSubmit}>
            <h3>Edit Product</h3>
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
                error={
                  formik.touched.productID && Boolean(formik.errors.productID)
                }
                helperText={formik.touched.productID && formik.errors.productID}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                autoComplete="off"
                id="image"
                name="image"
                label="Product Image URL"
                value={formik.values.image}
                onChange={formik.handleChange}
                error={formik.touched.image && Boolean(formik.errors.image)}
                helperText={formik.touched.image && formik.errors.image}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                autoComplete="off"
                id="price"
                name="price"
                label="Product Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                autoComplete="off"
                id="count"
                name="count"
                label="Count"
                value={formik.values.count}
                onChange={formik.handleChange}
                error={formik.touched.count && Boolean(formik.errors.count)}
                helperText={formik.touched.count && formik.errors.count}
              />
              <TextField
                style={textFieldStyle}
                fullWidth
                autoComplete="off"
                id="categories"
                name="categories"
                label="Product Categories"
                value={formik.values.categories}
                onChange={formik.handleChange}
                error={
                  formik.touched.categories && Boolean(formik.errors.categories)
                }
                helperText={
                  formik.touched.categories && formik.errors.categories
                }
              />
            </div>

            <Button
              style={saveCloseEditButton}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Save Edit
            </Button>
            <Button
              style={saveCloseEditButton}
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
    </div>
  );
}

export default EditProduct;

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

const saveCloseEditButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
};
