import { createContext, useContext, useEffect, useState } from "react";
import { makeReq } from "../helper";

interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  _id: string;
}

interface UserContext {
  loggedInUser?: User;
  /* setIsLoggedIn: React.Dispatch<React.SetStateAction<any[]>>,
  setLoggedInUser: React.Dispatch<React.SetStateAction<any[]>>, */

  postUser: ({}) => Promise<any>
  loginUser: ({}) => Promise<any>
  updateUser: ({}) => Promise<any>
  //fetchLoggedInUser: () => void;
  signOut: () => void;
}

export const UserContext = createContext<UserContext>({
  postUser: async () => {},
  loginUser: async () => {},
  updateUser: async () => {},
  //fetchLoggedInUser: () => {},
  signOut: () => {},
});

export const UserProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<User>();


  console.log(loggedInUser)

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

  const updateUser = async (user: any) => {
    console.log('in update user')
    console.log(user.id)
      
    let { data }  = await makeReq('/api/user/628deca2a1832c5492d79d9a', "PUT", user);
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

  

  const signOut = async () => {
    let response = await makeReq("/api/logout", "DELETE");
    setLoggedInUser(undefined);

    // todo: navigate ist'llet...
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        postUser,
        loginUser,
        updateUser,
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
