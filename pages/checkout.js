import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Layout/Header";
import Error from "../components/UI/Error";
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import NotificationContext from "../context/NotificationContext";
import SubTotal from "../components/Cart/SubTotal";
import UserDetails from "../components/Forms/UserDetails";
import StripeCheckout from "react-stripe-checkout";
import { generateOrderData, generateCustomerData } from "../utils/users-helper";
import { getStripeTotal } from "../utils/calculate-discount";
export default function checkout({ paymentGateways }) {
  const { currentCartItems, currentCouponCode } = useContext(CartContext);
  const { userData, setWcUserData } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const [cartData, setCartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showStripe, setShowStripe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedPayement, setSelectedPayment] = useState("");

  const fetchCartProducts = async () => {
    if (currentCartItems() && currentCartItems().cart.length > 0) {
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
    const customerData = generateCustomerData(data);

    registerCustomer(customerData);
  };
  const onToken = (token) => {
    setNotification(
      "Your Order Is Processing Please dont't close this page",
      "warning"
    );
    const reqData = {
      url: "/api/stripe/checkout",
      method: "POST",
      data: { ...token, productsCost: getStripeTotal(cartData) },
    };
    axios(reqData).then((res) => {
      if (res.data.error == false) {
        sendOrder();
      }
    });
  };
  useEffect(() => {
    fetchCartProducts();
  }, [currentCartItems, currentCouponCode]);
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (Object.keys(userData).length == 0) {
      setNotification(
        "Please Enter your Details Before Placing your order",
        "danger"
      );
      return;
    }
    if (selectedPayement == "cod" || selectedPayement == "bacs") {
      setNotification(
        "Your Order Is Processing Please dont't close this page",
        "warning bg-yellow-400"
      );

      sendOrder();
    } else if (selectedPayement === "stripe") {
      setShowStripe(true);
    } else {
      console.log(selectedPayement);
    }
  };
  const sendOrder = () => {
    let couponCode;
    if (currentCouponCode()) {
      couponCode = currentCouponCode().coupons[0].couponCode;
    }
    const dataToSend = generateOrderData({
      cartData: currentCartItems(),
      userData,
      couponCode,
      selectedPayement,
      paymentGateways,
    });
    const sendReq = {
      url: "/api/orders",
      method: "POST",
      data: dataToSend,
    };
    axios(sendReq)
      .then((res) => {
        if (res.data.id) {
          setNotification(
            `Your order has been received successfully please check your accounts page`,
            "success bg-green-400"
          );
        }
      })
      .catch((err) => console.log(err.response));
  };
  const registerCustomer = (customerData) => {
    const sendReq = {
      url: `/api/customers`,
      method: "POST",
      data: customerData,
    };
    axios(sendReq)
      .then((res) => {
        if (res.data.msg) {
          setNotification("Already Have Accounnt", "danger");
        } else {
          setWcUserData(res.data);
          setNotification("Your Data has been saved Successfully", "success");
        }
      })
      .catch((err) => {
        if (err.response) {
          setNotification("Already Have Accounnt", "danger");
        }
      });
  };
  if (isLoaded) {
    return (
      <>
        <Header />
        <section className="container mx-auto ">
          <div className="grid md:grid-cols-4 gap-3 my-4">
            <section className="col-span-3">
              <UserDetails getFormData={getFormData} userData={userData} />
            </section>
            <section className="col-span-3 md:col-span-1 px-4 md-px-1 text-gray-800">
              <div className="border p-2">
                {cartData.items.map((item) => (
                  <div>
                    <strong>{item.name} x</strong> {item.quantity}
                  </div>
                ))}
              </div>
              <SubTotal {...cartData} />
              <form onSubmit={(e) => e.preventDefault()}>
                {paymentGateways.map((gateway, i) => (
                  <div
                    className="form-check cursor-pointer"
                    role="button"
                    key={gateway.id}
                  >
                    <input
                      className="form-check-input mr-2"
                      type="radio"
                      name="flexRadioDefault"
                      id={`flexRadioDefault${i}`}
                      value={gateway.id}
                      required="true"
                      onClick={(e) => setSelectedPayment(e.target.value)}
                    />
                    <label className="" for={`flexRadioDefault${i}`}>
                      {gateway.title}
                    </label>
                  </div>
                ))}
                <div className="my-4">
                  {showStripe && (
                    <StripeCheckout
                      name="Red Bag Store"
                      description="Online Store"
                      amount={getStripeTotal(cartData)}
                      token={onToken}
                      currency="USD"
                      email={userData.email}
                      billingAddress={userData.billingAddress}
                      shippingAddress={userData.billingAddress}
                      stripeKey={process.env.NEXT_PUBLIC_STRIPE_KEY}
                    />
                  )}
                </div>

                <button
                  className="btn w-full  mt-4 "
                  onClick={handlePlaceOrder}
                >
                  Place Order Now
                </button>
              </form>
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
