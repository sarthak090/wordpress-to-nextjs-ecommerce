import React, { useContext } from "react";
import Link from "next/link";
import { navLinks } from "../../site.config";
import CartContext from "../../context/CartContext";
export default function NavBar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand" href="/">
          WP-ECOM
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse "
        id="navbarNavAltMarkup 
        "
      >
        <div className="navbar-nav   w-100">
          {navLinks.map((nav) => (
            <Link href={nav.href}>
              <a href={nav.href} className="nav-item nav-link">
                {nav.label}
              </a>
            </Link>
          ))}
          <Link href={"/cart"}>
            <a href={"/cart"} className="nav-item nav-link">
              cart {parseInt(cart.length)}
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
