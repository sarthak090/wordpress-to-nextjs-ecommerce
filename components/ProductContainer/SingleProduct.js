import React from "react";
import Link from "next/link";

export default function SingleProduct(product) {
  return (
    <div className="border relative border-gray-400 shadow-md rounded p-2">
      <Link href={`/product/${product.slug}`}>
        <a href={`/product/${product.slug}`} className="relative ">
          <div className="product-inner-col ">
            <div className="flex justify-center max-h-64">
              <img
                src={product.featuredImage}
                className="w-full img-fluid product-img object-scale-down"
              />
            </div>

            <div className="flex flex-col gap-4 items-center text-xl">
              <div className="text-blue-800">{product.name}</div>
              <div>${product.price}</div>
            </div>
          </div>
        </a>
      </Link>
      {/* <div
        className="absolute top-2 cursor-pointer left-4"
        onClick={() => product.toggleWishList(product.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-9 w-9 text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div> */}
    </div>
  );
}
