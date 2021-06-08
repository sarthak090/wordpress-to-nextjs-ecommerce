import { createContext, useState } from "react";
const NotificationContext = createContext();
export const NotificationProvider = (props) => {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("bg-green-300");
  const [notfTime, setNotfTime] = useState(3000);
  const setNotification = (notificationMsg, type, time) => {
    setMsg(notificationMsg);
    if (type !== msgType) {
      setMsgType(type);
    }
    if (time > 3000) {
      setNotfTime(time);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
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
