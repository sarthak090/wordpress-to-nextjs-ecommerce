import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Error from "../../components/UI/Error";
import Header from "../../components/Layout/Header";
import AddressData from "../../components/Account/Address";
import SideNav from "../../components/Account/SideNav";

export default function CustomerAddress() {
  const { isAuthenticated, userData } = useContext(AuthContext);
  useEffect(() => {
    console.log(userData);
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="container px-2 my-4">
            <div className="grid md:grid-cols-6">
              <div className="col-span-3 md:col-span-2">
                <SideNav active="address" />
              </div>
              <div className="col-span-2 border border-gray-200 my-4 px-2 md:my-0 md:ml-4">
                <AddressData userData={userData} title="Billing Address" />
              </div>
              <div className="col-span-2 md:ml-4">
                <AddressData userData={userData} title="Shipping Address" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <SideNav active="address" />
            </div>
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <AddressData userData={userData} title="Billing Address" />
                </div>
                <div className="col-lg-6">
                  <AddressData userData={userData} title="Shipping Address" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
  }
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <SideNav active="address" />
          </div>
          <div className="col-lg-8">
            <div className="row">
              <Error errorMsg="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
