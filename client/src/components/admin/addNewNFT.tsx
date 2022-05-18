import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { CSSProperties } from "react";
import { NftItem } from "../../data/collections/collection";
import { useProducts } from "../context/ProductContext";

function AddNewNFT() {
  const { addNft, addNftModal, closeAddNftModal, selectedCollectionID } =
    useProducts();
  //   const handleChange = (event: any) => {
  //     setCollectionID(event.target.value);
  //   };
  const formik = useFormik({
    initialValues: {
      collection: 0,
      NFTid: 0,
      nftImage: "",
      description: "",
      price: 0,
    },
    onSubmit: (values) => {
      let newNft: NftItem = {
        NFTid: values.NFTid,
        image: values.nftImage,
        description: values.description,
        price: values.price,
        count: 1,
        collectionID: values.collection,
      };
      addNft(newNft, selectedCollectionID);
      formik.resetForm();
      closeAddNftModal();
    },
  });
  return (
    <div>
      {addNftModal && (
        <div style={newCollectionContainer}>
          <div>
            <form style={formStyle} onSubmit={formik.handleSubmit}>
              <h3>Add new NFT</h3>
              <div style={textFieldsContainer}>
                <TextField
                  style={textFieldStyle}
                  fullWidth
                  autoComplete="off"
                  id="NFTid"
                  name="NFTid"
                  label="NFT ID"
                  value={formik.values.NFTid}
                  onChange={formik.handleChange}
                  error={formik.touched.NFTid && Boolean(formik.errors.NFTid)}
                  helperText={formik.touched.NFTid && formik.errors.NFTid}
                />
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
                style={addNewNFTButton}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Add new NFT
              </Button>
              <Button
                style={closeWindowButton}
                color="primary"
                variant="contained"
                fullWidth
                onClick={closeAddNftModal}
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

export default AddNewNFT;

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

const addNewNFTButton: CSSProperties = {
  marginTop: "1rem",
  width: "40%",
  marginBottom: "1rem",
};

const closeWindowButton: CSSProperties = {
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
