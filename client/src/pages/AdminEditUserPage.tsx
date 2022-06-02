import { CSSProperties, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
//import { User } from "@server/*";
import { User } from "../../../server/resources";

function AdminEditUserPage() {
  const { getAllUsers, allUsers, adminRequest, loggedInUser, updateUserRole } =
    useContext(UserContext);

  console.log(loggedInUser);

  useEffect(() => {
    getAllUsers();
  }, []);

  function handleChange(user: User) {
    let userToUpdate = {
      ...user,
      isAdmin: !user.isAdmin,
    };
    updateUser(userToUpdate);
  }

  async function updateUser(userToUpdate: User) {
    const update = await updateUserRole(userToUpdate);
    getAllUsers();
  }

  return (
    <div style={adminPageLayout}>
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
