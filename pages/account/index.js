import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import Error from "../../components/UI/Error";
import Header from "../../components/Layout/Header";
import SideNav from "../../components/Account/SideNav";
export default function index() {
  const { userData } = useContext(AuthContext);
  if (Object.keys(userData).length) {
    return (
      <>
        <Header />
        <div className="container px-2">
          <div className="grid md:grid-cols-4">
            <div className="col-span-3 md:col-span-1">
              <SideNav active="home" />
            </div>
            <div className="col-span-3 md:ml-4">
              <SideNav active="home" />
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
        <Error errorMsg="" />
      </div>
    </>
  );
}
