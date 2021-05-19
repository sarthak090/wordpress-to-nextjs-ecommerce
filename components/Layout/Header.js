import React, { useContext } from "react";
import NavBar from "./NavBar";
import NotificationContext from "../../context/NotificationContext";
export default function Header() {
  const { msg, msgType } = useContext(NotificationContext);
  const showNotifcation = () => {
    return (
      <>
        {msg.length > 0 && (
          <div class={`alert alert-${msgType} my-4`} role="alert">
            {msg}
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <NavBar />
      <div className="container">{showNotifcation()}</div>
    </div>
  );
}
