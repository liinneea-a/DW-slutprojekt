import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import { CSSProperties, useState } from "react";
// import { ProductSchema } from "../../../../server/resources";

import * as yup from "yup";
import { useProducts } from "../../context/ProductContext";
import { ProductData } from "../../ProductData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Please enter new name").min(1),
  description: yup.string().required("Please enter a new description").min(2),
  productImage: yup.string().required("Please enter a new image URL").min(10),
  price: yup.number().required("Please enter the updated price").min(1),
  stock: yup.number().required("Please enter the available stock"),
  categories: yup.array().required("Please enter at least one category").min(1),
});


function AddNewProduct(props: Props) {
  const { addProduct, getAllProducts } = useProducts();
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
  };
  console.log(image, imageId)

  const formik = useFormik({
    initialValues: {
      name: "",
      imageId,
      //imageUrl: "",
      //imageId: "",
      price: 0,
      description: "",

      stock: 0,
      categories: [""],
      id: "",
    },
/*
      stock: "",
      categories: "",
    },validationSchema: validationSchema,
        */
    onSubmit: (values) => {
      let product: ProductData = {
        id: values.id,
        name: values.name,
        imageId,
        //imageUrl: values.imageUrl,
        //imageId: values.imageId,
        price: values.price,
        description: values.description,
        stock: values.stock,
        categories: values.categories,
        //image: "",
        quantity: 0
      };
      console.log(imageId)
      console.log(product)
      createNewProduct(product);
      formik.resetForm();
      props.onClose();
    },
  });





  async function createNewProduct(product: ProductData) {
    const newProduct = /* await */ addProduct(product);
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
              name="media" //"imageId"
              type="file"
              //label="Image url"
              //value={formik.values.imageId}
              onChange= {(e) => handleImage(e)}//{formik.handleChange}
             // error={formik.touched.imageId && Boolean(formik.errors.imageId)}
              //helperText={formik.touched.imageId && formik.errors.imageId}
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
          <div style={{display: 'flex', justifyContent: 'center', alignItems:'flex-start', gap:'1rem'}}>
          <Button
            style={addNewProductButton}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Add 
          </Button>
          <Button
            style={closeWindowButton}
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
  textAlign: "center",
  width: "clamp(10rem, 90vmin, 40rem",
  maxHeight: '90vh'
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
