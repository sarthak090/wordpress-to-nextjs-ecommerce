import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { addUserDataToLoc } from "../utils/users-helper";
const AuthContext = createContext();
export const AuthProvider = (props) => {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const getUserData = async () => {
    const wcUserData = await JSON.parse(
      window.localStorage.getItem("wcUserData")
    );

    if (wcUserData) {
      setUserData(wcUserData);
      setIsAuthenticated(true);
      return wcUserData;
    } else {
      console.log(`User Not Authenticated`);
    }
  };
  const setWcUserData = (data) => {
    addUserDataToLoc(data);
    getUserData();
  };
  const loadCustomerOrders = async () => {
    const user = await getUserData();

    try {
      const customerData = await axios.get(
        `/api/orders?customer=${user.customer_id}`
      );
      return {
        ordersLoaded: true,
        ordersData: customerData.data,
      };
    } catch (err) {
      console.log(err.response);
      return {
        ordersLoaded: false,
        ordersData: null,
      };
    }
  };

  useEffect(() => {
    getUserData();
    console.log(`Getting User Data From Local Storage`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setWcUserData,
        loadCustomerOrders,
        getUserData,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
