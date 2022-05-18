import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CSSProperties } from "react";
import { collectionDataItem } from "../../data/collections/collection";
import { useProducts } from "../context/ProductContext";

const validationSchema = yup.object({
  name: yup.string().required("Please enter new name").min(1),
  description: yup.string().required("Please enter new description").min(2),
  productImage: yup.string().required("Please enter new image URL").min(10),
});

function EditCollection() {
  const {
    editCollectionModal,
    selectedCollection,
    editCollection,
    closeEditCollectionModal,
  } = useProducts();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedCollection.name ,
      description: selectedCollection.description,
      productImage: selectedCollection.productImage,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let newCollection: collectionDataItem = {
        id: selectedCollection.id,
        name: values.name,
        description: values.description,
        volumeTraded: selectedCollection.volumeTraded,
        floorPrice: selectedCollection.floorPrice,
        header: selectedCollection.header,
        productImage: values.productImage,
        NFTS: selectedCollection.NFTS,
      };
      editCollection(newCollection);
      formik.resetForm();
      closeEditCollectionModal();
    },
  });
  return (
    <div>
      {editCollectionModal && (
        <div style={newCollectionContainer}>
          <div>
            <form style={formStyle} onSubmit={formik.handleSubmit}>
              <h3>Edit Collection</h3>
              <h3>Editing: {selectedCollection.name}</h3>

              <div style={textFieldsContainer}>
                <TextField
                  style={textFieldStyle}
                  fullWidth
                  autoComplete="off"
                  id="name"
                  name="name"
                  label="Colleciton name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  style={textFieldStyle}
                  fullWidth
                  autoComplete="off"
                  id="description"
                  name="description"
                  label="Collection description"
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
                  id="productImage"
                  name="productImage"
                  label="Set collection image URL"
                  value={formik.values.productImage}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.productImage &&
                    Boolean(formik.errors.productImage)
                  }
                  helperText={
                    formik.touched.productImage && formik.errors.productImage
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
                onClick={closeEditCollectionModal}
              >
                Close window
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCollection;

const newCollectionContainer: CSSProperties = {
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
