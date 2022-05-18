import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { CSSProperties, useState } from "react";
import { NftItem } from "../../data/collections/collection";
import { useProducts } from "../context/ProductContext";

const validationSchema = yup.object({
  nftImage: yup.string().required("Please enter new image URL").min(10),
  description: yup.string().required("Please enter new description").min(2),
  price: yup.number().required("Please enter new price").min(1),
});

function EditNFT() {
  const {
    editNft,
    closeEditNftModal,
    editNftModal,
    selectedNFT,
    selectedCollection,
  } = useProducts();


  // if(!editNftModal) return
  // openEditNftModal(selectedNFT, selectedCollection.id, selectedCollection)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nftImage: selectedNFT.image,
      description: selectedNFT.description,
      price: selectedNFT.price,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let newNft: NftItem = {
        NFTid: selectedNFT.NFTid,
        image: values.nftImage,
        description: values.description,
        price: values.price,
        count: 1,
        collectionID: selectedNFT.collectionID,
      };
      editNft(newNft, selectedCollection?.id);
      formik.resetForm();
      closeEditNftModal();
    },
  });
  return (
    <div>
      {editNftModal && (
        <div style={newCollectionContainer}>
          <div>
            <form style={formStyle} onSubmit={formik.handleSubmit}>
              <h3>Edit NFT</h3>
              <h3>Editing: # {selectedNFT?.NFTid}</h3>
              <p style={editNftDescription}>
                Description: {selectedNFT?.description}
              </p>

              <div style={textFieldsContainer}>
                <TextField
                  style={textFieldStyle}
                  fullWidth
                  autoComplete="off"
                  id="nftImage"
                  name="nftImage"
                  label="NFT image URL"
                  value={formik.values.nftImage}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nftImage && Boolean(formik.errors.nftImage)
                  }
                  helperText={formik.touched.nftImage && formik.errors.nftImage}
                />
                <TextField
                  style={textFieldStyle}
                  fullWidth
                  autoComplete="off"
                  id="description"
                  name="description"
                  label="NFT description"
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
                  id="price"
                  name="price"
                  label="Set NFT price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
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
                onClick={closeEditNftModal}
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

export default EditNFT;

const newCollectionContainer: CSSProperties = {
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
};

const editNftDescription: CSSProperties = { width: "80%" };

const textFieldStyle: CSSProperties = {
  marginBottom: "1rem",
  width: "100%",
};

const saveCloseEditButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
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
