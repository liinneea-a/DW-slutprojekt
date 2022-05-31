import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { CSSProperties, useContext, useEffect, useState } from "react";
//import { User, Product } from "../../../server/resources";
import { UserContext } from "../context/LoginContext";
import { User } from "@server/*";

//const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AdminEditUserPage() {
  const {
    getAllUsers,
    allUsers,
    adminRequest,
    loggedInUser /* updateUser  */,
  } = useContext(UserContext);

  console.log(loggedInUser);

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleChange(user: User) {
    postEditedRole(user, !user.isAdmin);
  }

  async function postEditedRole(user: User, isAdmin: boolean) {
    const response = await fetch(`/api/user/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...user,
        isAdmin,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    getAllUsers();
    console.log(result);
    console.log(allUsers);
  }

  return (
    <div style={adminPageLayout}>
      {/*  <button onClick={showUsers}>Manage</button> */}
      <div>
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          EDIT USERS
        </h2>
        {allUsers?.map((user) => {
          return (
            <div key={user.id}>
              <div
                style={{
                  border: "1px grey solid",
                  borderRadius: "5px",
                  margin: "1rem",
                  padding: "1rem",
                }}
              >
                <p>Email: {user.email}</p>
                <p style={{ color: "yellow" }}>
                  {" "}
                  {user.adminRequest === true && user.isAdmin === false
                    ? "User requests admin role"
                    : ""}
                </p>
                {user.isAdmin ? (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ fontWeight: "bold" }}>Admin</p>
                    <p
                      style={{ color: "lightgray" }}
                      onClick={() => {
                        handleChange(user);
                      }}
                    >
                      User
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <p style={{ fontWeight: "bold" }}>User</p>
                    <p
                      style={{ color: "lightgray" }}
                      onClick={() => {
                        handleChange(user);
                      }}
                    >
                      Admin
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminEditUserPage;

const adminPageLayout: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  overflowX: "hidden",
  paddingBottom: "2rem",
  width: "100%",
};
