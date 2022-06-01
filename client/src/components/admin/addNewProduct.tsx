import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { useProducts } from "../../context/ProductContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function AddNewProduct(props: Props) {
  const { addProduct, getAllProducts } = useProducts();

  const formik = useFormik({
    initialValues: {
      name: "",
      imageId: "",
      price: "",
      description: "",
      stock: "",
      categories: "",
    },
    onSubmit: (values) => {
      let product = {
        name: values.name,
        imageId: values.imageId,
        price: values.price,
        description: values.description,
        stock: values.stock,
        categories: values.categories,
      };
      createNewProduct(product);
      formik.resetForm();
      props.onClose();
    },
  });

  async function createNewProduct(product: {}) {
    const newProduct = await addProduct(product);
    getAllProducts();
  }

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
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="imageId"
              name="imageId"
              label="Image url"
              value={formik.values.imageId}
              onChange={formik.handleChange}
              error={formik.touched.imageId && Boolean(formik.errors.imageId)}
              helperText={formik.touched.imageId && formik.errors.imageId}
              required
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="price"
              name="price"
              label="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              required
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="description"
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              required
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
              required
            />
            <TextField
              style={textFieldStyle}
              fullWidth
              autoComplete="off"
              id="categories"
              name="categories"
              label="Categories"
              value={formik.values.categories}
              onChange={formik.handleChange}
              error={
                formik.touched.categories && Boolean(formik.errors.categories)
              }
              helperText={formik.touched.categories && formik.errors.categories}
              required
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
