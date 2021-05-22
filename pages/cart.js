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
          // setCartProducts(products.items);
          setCartData(products);

          setIsLoaded(true);
        } else {
          setErrorMsg("No Products in Your Cart");
        }
      } catch (e) {
        console.log(e);
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
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">SubTotal</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.items.map((product) => (
                <CartRow
                  key={product.id}
                  {...product}
                  fetchCartProducts={fetchCartProducts}
                />
              ))}
            </tbody>
          </table>
          <div className="row">
            <div className="col-lg-8">
              <form className="form-inline" onSubmit={applyCouponForm}>
                <input
                  className="form-control "
                  onChange={(e) => setCouponCode(e.target.value)}
                  value={couponCode}
                  type="text"
                />
                <button className="btn btn-info ml-4">Add Coupon</button>
              </form>
            </div>
            <div className="col-lg-4">
              <SubTotal {...cartData} />
            </div>
            <button className="btn btn-block mt-4 btn-success">
              <Link href="/checkout">
                <a href="/checkout">Check Out</a>
              </Link>
            </button>
          </div>
        </div>
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
