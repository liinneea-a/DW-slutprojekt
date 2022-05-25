import { createContext, useContext, useEffect, useState } from "react";
import { boolean } from "yup/lib/locale";
import { makeReq } from "../helper";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
}

interface UserContext {
  loggedInUser: User;
  /* setIsLoggedIn: React.Dispatch<React.SetStateAction<any[]>>,
  setLoggedInUser: React.Dispatch<React.SetStateAction<any[]>>, */
  postUser: ({}) => Promise<any>
  loginUser: ({}) => Promise<any>
  updateUser: ({}) => Promise<any>
  //fetchLoggedInUser: () => void;
  isLoggedIn: boolean;
  signOut: () => void;
}

export const UserContext = createContext<UserContext>({
  loggedInUser: {
    email: "test@test.se",
    password: "test",
    isAdmin: false,
    _id: "",
  },
  postUser: async () => {},
  loginUser: async () => {},
  updateUser: async () => {},
  //fetchLoggedInUser: () => {},
  isLoggedIn: false,
  signOut: () => {},
});

export const UserProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User>({
    email: "",
    password: "",
    isAdmin: false,
    _id: "",
  });

  console.log(loggedInUser, isLoggedIn)

  const postUser = async (user: {}) => {
    try {
      let response = await makeReq("/api/user", "POST", user);
      console.log(response)
      return response
    } catch (err) {
      return console.log(err);
    }
  }

  const loginUser = async (user: {}) => {
    try {
      let response = await makeReq("/api/login", "POST", user);
      /* console.log(response) */
      setLoggedInUser(response)
      setIsLoggedIn(true)
      return response
    } catch (err) {
      return console.log(err);
    }
  }

  const updateUser = async (user: any) => {
    console.log(user)
     try {
      let response = await makeReq(`/api/userUpdate/${user.id}`, "PUT", user);
      console.log(response)
      setLoggedInUser(response)
      setIsLoggedIn(true)
      return response
    } catch (err) {
      return console.log(err);
    } 
  }


  /* useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const fetchLoggedInUser = async () => {
    try {
      let response = await makeReq("/api/loggedin", "GET");
      if (!response.email) {
        return setIsLoggedIn(false);
      }
      console.log(response);
      setLoggedInUser(response);
      setIsLoggedIn(true);
    } catch (err) {
      return console.log(err);
    }
  }; */

  const signOut = async () => {
    let response = await makeReq("/api/logout", "DELETE");
    setIsLoggedIn(false);
    setLoggedInUser({
      email: "",
      password: "",
      isAdmin: false,
      _id: "",
    });
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        postUser,
        loginUser,
        updateUser,
        isLoggedIn,
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
export { };

