import React, { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import AuthContext from "../../context/AuthContext";
import Error from "../../components/UI/Error";
import Header from "../../components/Layout/Header";
import DownloadsTable from "../../components/Account/DownloadsTable";
import SideNav from "../../components/Account/SideNav";

export default function downloads() {
  const { userData } = useContext(AuthContext);
  const [setApiUrl, downloadsData, isLoaded, isError] = useFetch(``);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (userData && userData.customer_id !== undefined) {
      setApiUrl(
        `/api/orders/downloads/${userData ? userData.customer_id : ""}`
      );
      if (isError) {
        setErrorMsg(`No Downloads Found`);
      }
    }
  }, [userData, downloadsData, isError]);
  if (isLoaded && downloadsData.length) {
    return (
      <>
        <Header />
        <div className="container">
          <div className="container px-2">
            <div className="grid md:grid-cols-4">
              <div className="col-span-3 md:col-span-1">
                <SideNav active="downloads" />
              </div>
              <div className="col-span-3 md:ml-4">
                <DownloadsTable customerOrdersData={downloadsData} />
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
              <SideNav active="downloads" />
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
