import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import useFetch from "../../../hooks/useFetch";
import Header from "../../../components/Layout/Header";
import Error from "../../../components/UI/Error";
import axios from "axios";

export default function ViewOrderById() {
  const { userData } = useContext(AuthContext);
  const [setApiUrl, orderData, isLoaded] = useFetch("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (Object.keys(userData).length && router.query.id !== undefined) {
      //check order id exist in current user then fetch the product
      axios
        .get(
          `${process.env.NEXT_PUBLIC_WP}/wpc/v1/orders-id?cid=${userData.customer_id}`
        )
        .then((resp) => {
          if (resp.data.length) {
            const ordersId = resp.data;
            const orderExist = ordersId.indexOf(
              (id) => id == parseInt(router.query.id)
            );
            if (orderExist !== undefined) {
              setApiUrl(`/api/orders/${router.query.id}`);
            } else {
              setErrorMsg(`Invalid Order`);
            }
          }
        })
        .catch((err) => {
          setErrorMsg(`Invalid Order`);
        });
    } else {
      setErrorMsg(`Invalid Order`);
    }
  }, [userData, router, orderData]);
  if (isLoaded) {
    return (
      <>
        <Header />
        <div className="container text-gray-800 my-8 px-4">
          <h1 className="text-4xl font-semibold text-gray-800">
            Order details
          </h1>
          <div className="grid grid-cols-1 border my-8">
            {orderData.line_items.map((item) => (
              <div className="flex justify-around my-2 text-xl " key={item.id}>
                <div className="font-semibold">{item.name}</div>
                <div>
                  <span className="mr-3 text-bold">
                    {item.price}x {item.quantity}
                  </span>
                  ${item.subtotal}
                </div>
              </div>
            ))}
          </div>
          <div className="text-2xl my-8">
            <strong>Payment Method:</strong>
            {orderData.payment_method_title}
          </div>
          <div className="grid md:grid-cols-2">
            <div className="col-lg-6">
              <h3 className="text-2xl mb-4">Billing Address</h3>

              {Object.keys(orderData.billing).map((key) => (
                <div>
                  <strong>{key.split("_").join(" ")}:</strong>
                  {orderData.billing[key]}
                </div>
              ))}
            </div>
            <div className="col-lg-6">
              <h3 className="text-2xl mb-4">Shipping Address</h3>

              {Object.keys(orderData.shipping).map((key) => (
                <div>
                  <strong>{key.split("_").join(" ")}:</strong>
                  {orderData.shipping[key]}
                </div>
              ))}
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
        <Error errorMsg={errorMsg} />
      </div>
    </>
  );
}
