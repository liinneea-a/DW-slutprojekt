import { Button, TextField } from "@mui/material";
// import { Product } from "@server/types";

import { useFormik } from "formik";
import { CSSProperties, useState } from "react";
//import { Product } from "../../../../server/resources";
//import { Product } from "../../../../server/resources";
import { useProducts} from "../../context/ProductContext";
import { ProductData } from "../../ProductData";


interface Props {
  isOpen: boolean;
  product: ProductData;
  onClose: () => void;
}

// const validationSchema = yup.object({
//   name: yup.string().required("Please enter new name").min(1),
//   description: yup.string().required("Please enter a new description").min(2),
//   productImage: yup.string().required("Please enter a new image URL").min(10),
// });

function EditProduct(props: Props) {
  
  const { editProduct, getAllProducts } = useProducts();
  const [imageId, setImageId] = useState<string>();
  const [image, setImage] = useState();

  const handleImage = async (event: any) => {
    let data = new FormData();
    console.log(data)
    data.append("media", event.target.files[0]);
    let response = await fetch("/api/media", {
      method: "POST",
      body: data,
    });
    let jsonres = await response.json();
    setImage(jsonres.filename);
    setImageId(jsonres._id);
    console.log(image, imageId)
  };


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
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      let updatedProduct = {
        _id: props.product._id,
        name: values.name,
        imageId,
        description: values.description,
        price: values.price,
        //imageId: values.imageId,
        stock: values.stock,
        categories: values.categories,
        image: "",
        quantity: 0,
      };
      editOldProduct(updatedProduct);
      formik.resetForm();
      props.onClose();
    },
  });

   function editOldProduct(updatedProduct: ProductData) {
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
            name="media"
            type="file"
            //label="Product Image URL"
            //value={formik.values.imageId}
            onChange={ (e) => handleImage(e)}
            required
            //error={formik.touched.imageId && Boolean(formik.errors.imageId)}
            //helperText={formik.touched.imageId && formik.errors.imageId}
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
            onChange={(e) => formik.setFieldValue('categories', e.target.value.split(','))}
            error={
              formik.touched.categories && Boolean(formik.errors.categories)
            }
            helperText={formik.touched.categories && formik.errors.categories}
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
