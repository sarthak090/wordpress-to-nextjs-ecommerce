import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Layout/Header";
import Error from "../components/UI/Error";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import NotificationContext from "../context/NotificationContext";
import SubTotal from "../components/Cart/SubTotal";
import UserDetails from "../components/Forms/UserDetails";
export default function checkout({ paymentGateways }) {
  const { currentCartItems, addCoupon, currentCouponCode } =
    useContext(CartContext);
  const { userData, setWcUserData } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const [cartData, setCartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const fetchCartProducts = async () => {
    if (currentCartItems().cart.length > 0) {
      let couponCode = "";
      if (currentCouponCode()) {
        couponCode = currentCouponCode().coupons[0].couponCode;
      }
      try {
        const sendReq = {
          url: `${process.env.NEXT_PUBLIC_WP}/wpc/v1/cart/products`,
          method: "POST",

          data: {
            items: currentCartItems().cart,
            couponCode,
          },
          headers: { "Content-Type": "application/json" },
        };

        const products = await (await axios(sendReq)).data;

        if (products && products.items.length > 0) {
          setCartData(products);

          setIsLoaded(true);
        } else {
          setIsLoaded(false);

          setErrorMsg("No Products in Your Cart");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      setErrorMsg("No Products in Your Cart");
    }
  };
  const getFormData = (data) => {
    setWcUserData(data);
    setNotification("Your data has been saved", "success");
  };
  useEffect(() => {
    fetchCartProducts();
  }, [currentCartItems, currentCouponCode]);

  if (isLoaded) {
    return (
      <>
        <Header />
        <section className="container">
          <div className="row">
            <section className="col-lg-8">
              USER FORM Goes HERE
              <UserDetails getFormData={getFormData} userData={userData} />
            </section>
            <section className="col-lg-4">
              Billing Section Goes Here
              <div className="border p-2">
                {cartData.items.map((item) => (
                  <div>
                    <strong>{item.name} x</strong> {item.quantity}
                  </div>
                ))}
              </div>
              <SubTotal {...cartData} />
              {paymentGateways.map((gateway) => (
                <div className="" key={gateway.id}>
                  {gateway.title}
                </div>
              ))}
            </section>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Header />
      <Error errorMsg={errorMsg} />
    </>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WP}/wpc/v1/available-payment-gateways`
  );
  const json = await res.json();

  return {
    props: {
      paymentGateways: json,
    },
  };
};
