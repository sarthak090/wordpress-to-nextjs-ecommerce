import React, { useContext, useState } from "react";
import Link from "next/link";
import { navLinks } from "../../site.config";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
export default function NavBar() {
  const { cart } = useContext(CartContext);
  const { userData } = useContext(AuthContext);
  const [searhInput, setSearchInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const handleNavBar = () => {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("hidden");
  };
  const searchHandler = (evt) => {
    setSearchInput(evt.target.value);
    if (evt.target.value.length > 3) {
      console.log(evt.target.value);

      searchProduct(evt.target.value);
    }
  };
  const searchProduct = (title) => {
    axios
      .get(`/api/search?title=${title}`)
      .then((res) => {
        if (res.data.length) {
          setSearchResult(res.data);
          setShowResult(true);
        } else {
          setShowResult(false);
        }
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      <header className="flex justify-between   md:flex-row bg-gray-800 text-gray-100  py-0.5  text-xl  ">
        <div className="flex  items-center md:justify-around w-full md:pl-0 pl-4">
          <Link href="/">
            <a
              className="flex items-center flex-shrink-0 text-2xl py-4 md:py-0"
              href="/"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-red-400 font-medium">Red Bag</span>
            </a>
          </Link>

          {/* INPUT FORM FOR SEARCH */}
          <div className="relative items-center hidden md:flex my-2 max-w-xl w-full relative  ">
            <input
              type="text"
              className="outline-none ml-4 pl-4 text-gray-800 w-full rounded-full py-2"
              placeholder="Search the store"
              onChange={searchHandler}
              value={searhInput}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 absolute right-0 text-gray-800 cursor-pointer pr-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {showResult && (
              <div
                onClick={() => setShowResult(false)}
                className="absolute  px-8 py-4 bg-gray-800 w-full top-12 z-40 rounded h-auto flex flex-col"
              >
                {searchResult.map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.id}>
                    <a href={`/product/${product.slug}`}>
                      <div className="flex gap-8 items-center my-4 ">
                        <div className="h-28">
                          <img className="h-full" src={product.featuredImage} />
                        </div>
                        <div>
                          <p>{product.name}</p>
                          <p className="text-sm">${product.price}</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* ICONS HERE */}
          <div className=" hidden md:flex gap-4 items-center font-semibold">
            <Link href="/wishlist">
              <a
                href="/wishlist"
                className="flex flex-col items-center text-sm "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Wishlist
              </a>
            </Link>
            <Link href="/account">
              <a href="/account" className="flex flex-col items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {userData.billingAddress
                  ? `${userData.billingAddress.first_name}`
                  : " Sign In"}
              </a>
            </Link>

            <Link href="/cart">
              <a
                href="/cart"
                className="flex flex-col items-center text-sm relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div className="bg-gray-50  w-5 h-5 text-gray-800  rounded-full absolute right-0 text-center">
                  {parseInt(cart.length)}
                </div>
                Cart
              </a>
            </Link>
          </div>
        </div>

        <div
          className="self-center pr-8 cursor-pointer block md:hidden"
          id="navicon"
          onClick={handleNavBar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </header>
      <nav
        className="hidden z-30 text-xl md:hidden w-full bg-gray-700 flex absolute flex-col items-center"
        id="navbar"
      >
        {navLinks.map((item, id) => (
          <div className="py-3  w-full text-center text-gray-50 " key={id}>
            <Link href={item.href}>
              <a href={item.href}>{item.label}</a>
            </Link>
          </div>
        ))}
        <div className="py-3   w-full text-center text-gray-50 ">
          <Link href="/cart">
            <a
              href="/cart"
              className="flex relative flex-col items-center text-sm "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-9 w-9 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div className="bg-gray-50  w-5 h-5 text-gray-800  rounded-full absolute ml-8 text-center">
                {parseInt(cart.length)}
              </div>
              Cart
            </a>
          </Link>
        </div>
      </nav>
    </>
  );
}
