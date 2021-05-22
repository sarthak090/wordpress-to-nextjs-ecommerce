import { createContext, useState, useEffect } from "react";
import { addUserDataToLoc } from "../utils/users-helper";
const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [userData, setUserData] = useState({});
  const getUserData = () => {
    const wcUserData = JSON.parse(window.localStorage.getItem("wcUserData"));
    if (wcUserData) {
      setUserData(wcUserData);
    } else {
      console.log(`User Not Authenticated`);
    }
  };
  const setWcUserData = (data) => {
    addUserDataToLoc(data);
    getUserData();
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setWcUserData,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
