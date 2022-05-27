import { createContext, useContext, useEffect, useState } from "react";
import { boolean } from "yup";
import { makeReq } from "../helper";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  id: string;
  //_id: string;
  adminRequest: boolean;
}

interface UserContext {
  loggedInUser?: User;
  /* setIsLoggedIn: React.Dispatch<React.SetStateAction<any[]>>,
  setLoggedInUser: React.Dispatch<React.SetStateAction<any[]>>, */
  allUsers: User[];
  postUser: ({}) => Promise<any>
  loginUser: ({}) => Promise<any>
  updateUser: (user: User) => Promise<any>
  getAllUsers: () => Promise<any>
  //fetchLoggedInUser: () => void;
  signOut: () => void;
  setAdminRequest: React.Dispatch<React.SetStateAction<boolean>>
  adminRequest: Boolean
}

export const UserContext = createContext<UserContext>({
  allUsers: [],
  postUser: async () => {},
  loginUser: async () => {},
  getAllUsers: async () => void [],
  updateUser: async () => {},
  //fetchLoggedInUser: () => {},
  //allUsers: [],
  signOut: () => {},
  setAdminRequest: () => boolean,
  adminRequest: false,
});

export const UserProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminRequest, setAdminRequest] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<User[]>([]);


  console.log(adminRequest)

  const postUser = async (user: {}) => {
    try {
      let { ok } = await makeReq("/api/user", "POST", user);
      return ok
    } catch (err) {
      return console.log(err);
    }
  };

  const loginUser = async (user: any) => {
    console.log(user)
    try {

      let { data, ok } = await makeReq("/api/login", "POST", user);
      if (ok) {
        setLoggedInUser(data);
        return true
      } else {
        setLoggedInUser(undefined);
        return false
      }
    } catch (err) {
      console.log(err);
      return false
    }

  }

  const updateUser = async (user: User) => {
    console.log('in update user')
    console.log(user.id, user.id)
      
    let { data }  = await makeReq(`/api/users/${user.id}`, "PUT", user.isAdmin);
    setLoggedInUser(data)
    return data
  }
  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        let { data, ok } = await makeReq("/api/loggedin", "GET");
        if (ok) {
          setLoggedInUser(data);
        } else {
          setLoggedInUser(undefined);
        } 
        setIsLoading(false)
      } catch (err) {
        setIsLoading(false)
        return console.log(err);
      }
    };
    fetchLoggedInUser();
  }, []);

  
  const getAllUsers = async () => {
    try {
      let { data, ok } = await makeReq("/api/users", "GET");
      if (ok) {
        setAllUsers(data);
      } else {
        //setAllUsers(undefined);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return console.log(err);
    }
  }

  const signOut = async () => {
    let response = await makeReq("/api/logout", "DELETE");
    setLoggedInUser(undefined);

    // todo: navigate ist'llet...
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        setAdminRequest,
        adminRequest,
        loggedInUser,
        postUser,
        loginUser,
        updateUser,
        getAllUsers,
        allUsers,
        /* setIsLoggedIn,
        setLoggedInUser, */
        //fetchLoggedInUser,
        signOut,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
