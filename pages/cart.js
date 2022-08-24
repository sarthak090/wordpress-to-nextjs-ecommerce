import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Error from "../components/UI/Error";
import CartContext from "../context/CartContext";
import NotificationContext from "../context/NotificationContext";
import CartRow from "../components/Cart/TableRow";
import SubTotal from "../components/Cart/SubTotal";
import { isValidCoupon } from "../utils/cart-helpers";
import Link from "next/link";
export default function cart() {
  const { currentCartItems, addCoupon, currentCouponCode } =
    useContext(CartContext);
  const { setNotification } = useContext(NotificationContext);
  const [cartData, setCartData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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
          // setCartProducts(products.items);
          setCartData(products);

          setIsLoaded(true);
        } else {
          setErrorMsg("No Products in Your Cart");
        }
      } catch (e) {
        if (e) {
          setErrorMsg("Network Error Please Try Again");
        }
      }
    } else {
      setErrorMsg("No Products in Your Cart");
    }
  };

  const applyCouponForm = async (e) => {
    e.preventDefault();
    if (couponCode.length < 4) {
      setNotification("Please Enter valid coupon code", "danger");
    } else {
      const { isValid } = await isValidCoupon(couponCode);
      if (isValid) {
        addCoupon(couponCode);
        setNotification("Coupon Applied To Your Cart", "success");
      } else {
        setNotification("Please Enter valid coupon code", "danger");
      }
    }
  };

  useEffect(() => {
    if (currentCouponCode()) {
      setCouponCode(currentCouponCode().coupons[0].couponCode);
      fetchCartProducts();
    } else {
      fetchCartProducts();
    }
  }, [currentCartItems, currentCouponCode]);
  if (isLoaded && cartData.items) {
    return (
      <>
        <Header />
        <div className="container mx-auto">
          <div className="">
            {cartData.items.map((product) => (
              <CartRow
                key={product.id}
                {...product}
                fetchCartProducts={fetchCartProducts}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 border border-gray-300 my-4 p-4">
            <div className="self-center">
              <form
                className="flex justify-around sm:justify-start"
                onSubmit={applyCouponForm}
              >
                <input
                  className="px-4 py-2  border rounded focus:shadow border-gray-300 focus:border-blue-200 focus:outline-none "
                  onChange={(e) => setCouponCode(e.target.value)}
                  value={couponCode}
                  type="text"
                />
                <button className="btn transition-all  btn-info border hover:text-blue-500 focus:outline-none hover:bg-transparent hover:border-blue-300 ml-4">
                  Add Coupon
                </button>
              </form>
            </div>
            <div>
              <SubTotal {...cartData} />

              <Link href="/checkout">
                <a href="/checkout">
                  <button className="w-full bg-blue-600 p-3 text-gray-100">
                    Check Out
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Error errorMsg={errorMsg} />
      </div>
    </>
  );
}
