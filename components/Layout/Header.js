import React, { useContext } from "react";
import NavBar from "./NavBar";
import NotificationContext from "../../context/NotificationContext";
export default function Header() {
  const { msg, msgType } = useContext(NotificationContext);
  const showNotifcation = () => {
    return (
      <>
        {msg.length > 0 && (
          <div
            className={`px-4 py-3 rounded text-gray-50 font-semibold ${msgType} my-4`}
            role="alert"
          >
            {msg}
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <NavBar />
      <div className="container mx-auto">{showNotifcation()}</div>
    </>
  );
}
