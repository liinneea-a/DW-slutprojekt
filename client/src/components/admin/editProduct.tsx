import { Button, TextField } from "@mui/material";
// import { Product } from "@server/types";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import * as yup from "yup";
import { Product } from "../../../../server/resources";
// import { Product } from "../../../../server/resources";
import { useProducts } from "../../context/ProductContext";

interface Props {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Please enter new name").min(1),
  description: yup.string().required("Please enter a new description").min(2),
  productImage: yup.string().required("Please enter a new image URL").min(10),
  price: yup.number().required("Please enter the updated price").min(1),
  stock: yup.number().required("Please enter the updated stock"),
  categories: yup.array().required("Please enter at least one category").min(1),
});

function EditProduct(props: Props) {
  const { editProduct, getAllProducts } = useProducts();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: props.product.name,
      imageId: props.product.imageId,
      price: props.product.price,
      description: props.product.description,
      stock: props.product.stock,
      categories: props.product.categories,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let updatedProduct = {
        id: props.product.id,
        name: values.name,
        description: values.description,
        price: values.price,
        imageId: values.imageId,
        stock: values.stock,
        categories: values.categories,
      };
      editOldProduct(updatedProduct);
      formik.resetForm();
      props.onClose();
    },
  });

  function editOldProduct(updatedProduct: Product) {
    const update = editProduct(updatedProduct);
    getAllProducts();
  }

  if (!props.isOpen) return null;

  return (
    <div style={newProductContainer}>
      <form style={formStyle} onSubmit={formik.handleSubmit}>
        <h3>Edit Product {props.product.name}</h3>
        <div style={textFieldsContainer}>
          <TextField
            style={textFieldStyle}
            fullWidth
            autoComplete="off"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            autoComplete="off"
            id="imageId"
            name="imageId"
            label="Product Image URL"
            value={formik.values.imageId}
            onChange={formik.handleChange}
            error={formik.touched.imageId && Boolean(formik.errors.imageId)}
            helperText={formik.touched.imageId && formik.errors.imageId}
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
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            autoComplete="off"
            id="stock"
            name="stock"
            label="Stock"
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.touched.stock && Boolean(formik.errors.stock)}
            helperText={formik.touched.stock && formik.errors.stock}
          />
          <TextField
            style={textFieldStyle}
            fullWidth
            autoComplete="off"
            id="categories"
            name="categories"
            label="Product Categories"
            value={formik.values.categories}
            onChange={(e) =>
              formik.setFieldValue("categories", e.target.value.split(","))
            }
            error={
              formik.touched.categories && Boolean(formik.errors.categories)
            }
            helperText={formik.touched.categories && formik.errors.categories}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'flex-start', gap:'1rem'}}>
          <Button
            style={saveCloseEditButton}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Save
          </Button>
          <Button
            style={saveCloseEditButton}
            color="primary"
            variant="contained"
            fullWidth
            onClick={props.onClose}
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;

const saveCloseEditButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
};

const newProductContainer: CSSProperties = {
  backgroundColor: "black",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "#202225",
  border: "2px solid #000",
  zIndex: "9001",
  textAlign: "center",
  width: "clamp(10rem, 90vmin, 40rem",
  maxHeight: '90vh'
};

const textFieldStyle: CSSProperties = {
  marginBottom: ".4rem",
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
  alignItems: "center",
  flexDirection: "column",
  width: "90%",
  margin: "0 1rem",
};
