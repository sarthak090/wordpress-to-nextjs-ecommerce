import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Layout/Header";
import AuthContext from "../../../context/AuthContext";
import Error from "../../../components/UI/Error";
import OrdersTable from "../../../components/Account/OrdersTable";
import SideNav from "../../../components/Account/SideNav";

export default function customersOrders() {
  const { loadCustomerOrders } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [customerOrdersData, setCustomerOrdersData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(async () => {
    const { ordersLoaded, ordersData } = await loadCustomerOrders();
    if (ordersLoaded) {
      setCustomerOrdersData(ordersData);
      setIsLoaded(true);
      return;
    }
    if (ordersData == null) {
      setErrorMsg("Please Login To View Your Orders");
    }
  }, []);
  if (isLoaded) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="container px-2">
            <div className="grid md:grid-cols-4">
              <div className="col-span-3 md:col-span-1">
                <SideNav active="orders" />
              </div>
              <div className="col-span-3 md:ml-4">
                <OrdersTable customerOrdersData={customerOrdersData} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="container px-2">
          <div className="grid md:grid-cols-4">
            <div className="col-span-3 md:col-span-1">
              <SideNav active="orders" />
            </div>
            <div className="col-span-3 md:ml-4">
              <Error errorMsg={errorMsg} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
