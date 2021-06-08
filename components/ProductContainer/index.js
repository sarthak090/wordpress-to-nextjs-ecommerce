import React from "react";
import SingleProduct from "./SingleProduct";
export default function index({ products }) {
  const toggleWishList = (id) => {
    console.log(id);
  };
  const isWishlisted = (id) => {};
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products.map((product) => (
          <SingleProduct
            {...product}
            key={product.id}
            toggleWishList={toggleWishList}
          />
        ))}
      </div>
    </div>
  );
}
