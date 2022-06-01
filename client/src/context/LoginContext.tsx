import { createContext, useContext, useEffect, useState } from "react";
import { boolean } from "yup";
import { makeReq } from "../helper";


interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  id: string;
  adminRequest: boolean;
}

interface UserContext {
  loggedInUser?: User;
  allUsers?: User[];
  orders: any;
  postUser: ({}) => Promise<any>
  loginUser: ({}) => Promise<any>
  getAllUsers: () => Promise<any>
  getUserOrders: () => Promise<any>
  signOut: () => void;
  setAdminRequest: React.Dispatch<React.SetStateAction<boolean>>
  adminRequest: Boolean
}

export const UserContext = createContext<UserContext>({
  orders: [],
  postUser: async () => {},
  loginUser: async () => {},
  getAllUsers: async () => void [],
  getUserOrders: async () => void [],
  signOut: () => {},
  setAdminRequest: () => boolean,
  adminRequest: false,
});

export const UserProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminRequest, setAdminRequest] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [allUsers, setAllUsers] = useState<User[]>();
  const [orders, setOrders] = useState<any>([]);
  

  /** Create new user */ 

  const postUser = async (user: {}) => {
    try {
      let { ok } = await makeReq("/api/user", "POST", user);
      return ok
    } catch (err) {
      return console.log(err);
    }
  };


   /** Login user */ 

  const loginUser = async (user: any) => {
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


   /** get logged in users orders */ 

  const getUserOrders = async () => {
    try {
      let { data, ok } = await makeReq(`/api/order/${loggedInUser?.id}`, "GET");
      console.log(loggedInUser?.id)
      console.log(data)
      if (ok) {
        setOrders(data);
        console.log(orders)
        return true
      } else {
        setOrders(undefined)
      }
    } catch (err) {
      return console.log(err);
    }
  };  


   /** Looks for logged in user */ 
  
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

  

   /** Gets all users */ 

  const getAllUsers = async () => {
    try {
      let { data, ok } = await makeReq("/api/users", "GET");
      if (ok) {
        setAllUsers(data);
      } else {
       setAllUsers(undefined);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return console.log(err);
    }
  }


   /** Signout user */ 

  const signOut = async () => {
    let {data, ok} = await makeReq("/api/logout", "DELETE");
    setLoggedInUser(undefined);
  };

  return (
    <UserContext.Provider
      value={{
        setAdminRequest,
        adminRequest,
        loggedInUser,
        orders,
        getUserOrders,
        postUser,
        loginUser,
        //updateUser,
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
