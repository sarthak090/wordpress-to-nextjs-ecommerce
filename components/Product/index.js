import React, { useContext, useEffect, useState } from "react";
import VariationContainer from "./VariationContainer";
import RelatedProducts from "./RelatedProducts";
import CartContext from "../../context/CartContext";
import { hasProductInCart } from "../../utils/cart-helpers";

export default function index(product) {
  const { addProductToCart, cart } = useContext(CartContext);
  const [cartQty, setCartQty] = useState(0);
  const {
    name,
    id,
    ratings,
    description,
    salePrice,
    price,
    type,
    variations,
    attributes,
    crossSellProducts,
    upsellProducts,
    featuredImage,
    dimension,
    shortDescription,
  } = product;
  const handleCartBtn = () => {
    addProductToCart(id);
  };

  useEffect(() => {
    const { inCart, productIndex } = hasProductInCart(id, cart);
    if (inCart) {
      setCartQty(cart[productIndex].quantity);
    }
  }, [cart]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 mt-4 p-4 gap-8">
        <div className="flex flex-col col-span-2 md:col-span-1  w-full justify-center items-center">
          <div className="max-h-60 my-2">
            <img src={featuredImage} className="h-full " />
          </div>
          <div className="flex flex-col gap-2 w-full  cta-container ">
            <button
              className="px-4 py-1  flex items-center justify-center gap-4 bg-blue-600 rounded text-xl text-gray-50 hover:bg-blue-500 focus:outline-none"
              onClick={handleCartBtn}
            >
              Add To Cart
              <div className="flex relative ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-9 w-9 text-gray-50 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="h-5 w-5 text-gray-800 text-sm absolute font-semibold rounded-full right-0 flex items-center justify-center bg-gray-100">
                  {" "}
                  {cartQty}
                </div>
              </div>
            </button>
            <button className="px-4 py-2 flex items-center justify-center gap-4 bg-indigo-600 rounded text-xl text-gray-50 hover:bg-indigo-500 focus:outline-none">
              Buy Now
            </button>
          </div>
        </div>
        <div className=" product-desc col-span-2 mt-8 md:mt-4 ">
          <h1 className="text-4xl  md:text-5xl text-gray-800 mb-2  product-title">
            {name}
          </h1>

          <div className="ratings">{ratings > 0 && ratings}</div>
          <h2 className="text-2xl md:text-2xl mb-2 font-semibold ">
            ${salePrice < price && <del>{salePrice}</del>} {price}
          </h2>
          <div>
            {type === "variable" && (
              <VariationContainer
                variations={variations}
                attributes={attributes}
              />
            )}
          </div>

          <p className="">{shortDescription}</p>

          {description && (
            <div>
              <h2 className="text-2xl md:text-3xl text-gray-800 font-bold md:font-semibold my-2">
                {" "}
                Description
              </h2>
              {description}
            </div>
          )}

          <section className="text-gray-800">
            {attributes && (
              <h3 className="text-2xl md:text-3xl font-bold md:font-semibold mb-4">
                Specifications
              </h3>
            )}
            {attributes &&
              Object.keys(attributes).map((key) => (
                <div className="flex gap-4 text-md mb-2">
                  <span className="font-bold ">{key}:</span>{" "}
                  <span className="">{attributes[key]}</span>
                </div>
              ))}
            {dimension &&
              Object.keys(dimension).map((key) => (
                <div className="flex gap-4 text-md mb-2">
                  <span className="font-bold ">{key}:</span>{" "}
                  <span className="">{dimension[key]}</span>
                </div>
              ))}
          </section>
        </div>
      </div>

      {false && (
        <div className="related-products">
          {crossSellProducts && (
            <RelatedProducts
              products={crossSellProducts}
              type="Cross Sell Products"
            />
          )}
          {upsellProducts && (
            <RelatedProducts products={upsellProducts} type="Upsell Products" />
          )}
        </div>
      )}
    </div>
  );
}
