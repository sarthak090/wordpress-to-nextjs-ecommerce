import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Error from "../components/UI/Error";
import CartContext from "../context/CartContext";
import CartRow from "../components/Cart/TableRow";
export default function cart() {
  const { currentCartItems } = useContext(CartContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchCartProducts = async () => {
    if (currentCartItems().cart.length > 0) {
      try {
        const sendReq = {
          url: `${process.env.NEXT_PUBLIC_WP}/wpc/v1/cart/products`,
          method: "POST",

          data: {
            items: currentCartItems().cart,
          },
          headers: { "Content-Type": "application/json" },
        };

        const products = await (await axios(sendReq)).data;

        if (products && products.length > 0) {
          setCartProducts(products);

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

  const handleDeletBtn = () => {};
  useEffect(() => {
    fetchCartProducts();
  }, [currentCartItems]);
  if (isLoaded && cartProducts.length > 0) {
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
                <CartRow
                  key={product.id}
                  {...product}
                  fetchCartProducts={fetchCartProducts}
                />
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
