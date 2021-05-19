import { createContext, useState, useEffect } from "react";
const NotificationContext = createContext();
export const NotificationProvider = (props) => {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [notfTime, setNotfTime] = useState(3000);
  const setNotification = (notificationMsg, type, time) => {
    setMsg(notificationMsg);
    if (type !== msgType) {
      setMsgType(type);
    }
    if (time > 3000) {
      setNotfTime(time);
    }
    console.log(msgType);
    setTimeout(() => {
      setMsg("");
    }, notfTime);
    //return notification(msg, msgType, notfTime);
  };
  const notification = (notificationMsg, type, time) => {};
  return (
    <NotificationContext.Provider
      value={{
        setNotification,
        msg,
        msgType,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
