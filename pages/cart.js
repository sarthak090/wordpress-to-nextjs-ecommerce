import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Error from "../components/UI/Error";
import CartContext from "../context/CartContext";
export default function cart() {
  const { cart, getCart } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchCartProducts = async () => {
    if (cart.length > 0) {
      let productIds = cart.map((item) => String(item.id));
      //   let products = cart.map((item) => String(item.id));

      try {
        const sendReq = {
          url: `${process.env.NEXT_PUBLIC_WP}/wpc/v1/cart/products`,
          method: "GET",

          data: {
            items: "gh",
          },
          headers: { "Content-Type": "application/json" },
        };

        //   axios(sendReq).then((r) => console.log(r.data));
        const products = await axios(sendReq);
        console.log(products);
        if (products.length > 0) {
          setCartProducts(products);
          console.log(products);
          setIsLoaded(true);
        } else {
          setErrorMsg("No Products in Your Cart");
        }
      } catch (e) {
        console.log(e.response);
      }
    }
  };
  useEffect(() => {
    fetchCartProducts();
  }, [cart]);
  if (isLoaded) {
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
              {cartProducts.map((product) => (
                <tr>
                  <td>
                    {/* <img
                      className="img-fluid cart-item-img"
                      src={product.featuredImage}
                    /> */}
                    {product.name}
                  </td>
                  <td>
                    {/* <img
                      className="img-fluid cart-item-img"
                      src={product.featuredImage}
                    /> */}
                    {product.name}
                  </td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
