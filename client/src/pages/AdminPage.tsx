import { Button } from "@mui/material";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { User, Product } from "../../../server/resources";
import AddNewProduct from "../components/admin/addNewProduct";
import EditProduct from "../components/admin/editProduct";
import { useProducts } from "../context/ProductContext";
import { UserContext } from "../context/LoginContext";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };



function AdminPage() {
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>({
      id: "",
      name: "",
      description: "",
      price: 0,
      imageId: "",
      stock: 0,
      categories: [""],
      quantity: 0
   });

  const [openEditProductModal, setOpenEditProductModal] = useState(false);
  const { getAllProducts, products, addProduct, editProduct, removeProduct } =
    useProducts();
  const { getAllUsers, allUsers, adminRequest, updateUser } = useContext(UserContext);

  useEffect(() => {
    getAllProducts();
    getAllUsers();
  }, []);

  
 

  // async function handleRoleChange(user: User) {
  // await updateUser(user);
  // }

  console.log(adminRequest);

  return (
    <div style={adminPageLayout}>
      <Button
        onClick={() => localStorage.clear()}
        style={buttonStyle}
        variant="contained"
      >
        Clear LS
      </Button>
      <Button
        onClick={() => setOpenAddProductModal(true)}
        style={buttonStyle}
        variant="contained"
      >
        Add product
      </Button>
      <Button
        onClick={() => setUserInfo(true)}
        style={buttonStyle}
        variant="contained"
      >
        Handle users
      </Button>
      <div>
        <AddNewProduct
          isOpen={openAddProductModal}
          onClose={() => setOpenAddProductModal(false)}
        />
        <EditProduct
          isOpen={openEditProductModal}
          product={selectedProduct}
          onClose={() => setOpenEditProductModal(false)}
        />
      </div>
      <div style={adminProducts}>
        {products.map((product, index) => (
          <div style={adminAddStyle} key={product.id}>
            <div style={adminCardHeader}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "2rem" }}
              >
                <div>Product #{product.name}</div>
                <div>{product.price} SEK</div>
              </div>
              <div style={buttonDivStyle}>
                <Button
                  onClick={() => [
                    setOpenEditProductModal(true),
                    setSelectedProduct(product),
                  ]}
                  style={editButtonStyle}
                  variant="contained"
                  href=""
                >
                  Edit
                </Button>
                <Button
                  onClick={() => [removeProduct(product), getAllProducts()]}
                  style={editButtonStyle}
                  variant="contained"
                  href=""
                >
                  Remove
                </Button>
              </div>
            </div>
            <div style={adminCardMiddle}>
              <div style={adminCardMidLeft}>
                <img style={adminImageStyle} alt="" srcSet={product.imageId} />
              </div>
              <div style={adminCardMidRight}>
                <div style={descStyle}>{product.description}</div>
                <div style={descStyle}>Items in stock: {product.stock}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {userInfo ? (
        <div>
          <h2>EDIT USERS</h2>
          {allUsers.map((user) => {
            return (
              <div key={user.id}>
                <div style={{border: "1px grey solid", borderRadius: "5px", margin: "1rem", padding: "1rem"}}>
                  <p>Email: {user.email}</p>
                  <p style={{color: "yellow"}}> {user.adminRequest === true ? ("User requests admin role") : ("") }</p>
                  <p>Role: {user.isAdmin ? "Admin" : "User"}
                  {/* {user.isAdmin ?  (<Switch {...label} defaultChecked onClick={ () => {handleRoleChange(user)}}/>)
                  : 
                 ( <Switch {...label} onClick={ () => {handleRoleChange(user)}} />)} */}
                 </p>
                 
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AdminPage;

const adminPageLayout: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  overflowX: "hidden",
  paddingBottom: "2rem",
  width: "100%",
};

const adminProducts: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "90%",
  padding: "0 1rem 1rem 1rem",
  gap: "1rem",
};

const adminCollectionsHeader: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "1rem",
  width: "100%",
  flexWrap: "wrap",
};

const adminAddStyle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  flexDirection: "column",
  boxShadow: "1px 1px 6px black",
  borderRadius: ".5rem",
  background: "#303339",
  width: "25rem",
  padding: "1rem",
  textAlign: "center",
  position: "relative",
};

const adminCardHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

const adminImageStyle: CSSProperties = {
  width: "5rem",
  height: "5rem",
};

const adminCollectionMain: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const headerLeft: CSSProperties = {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
};

const descStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: "100%",
  fontSize: ".75rem",
};

const headerRight: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  justifyContent: "center",
};

const buttonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "rgb(32, 129, 226)",
  color: "white",
  fontSize: "small",
  width: "10rem",
};

const editButtonStyle: CSSProperties = {
  fontWeight: "bold",
  background: "#2081e2",
  color: "white",
  fontSize: "small",
  width: "5rem",
  marginTop: "auto",
  justifySelf: "flex-end",
};

const removeButton: CSSProperties = {
  position: "absolute",
  right: ".6rem",
  top: ".6rem",
  fontSize: "1.3rem",
  cursor: "pointer",
};

const buttonDivStyle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexDirection: "row",
  justifyContent: "space-around",
};

const adminCardMiddle: CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
};

const adminCardMidRight: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: "100%",
};

const adminCardMidLeft: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};
