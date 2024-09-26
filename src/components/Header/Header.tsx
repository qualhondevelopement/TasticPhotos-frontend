"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {} from "@/redux/cartSlice";
import Image from "next/image";
import "./header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(
    (state: any) => state.cart.cartData?.photos.length
  );
  console.log(cartItemsCount, "count");
  const handleCartButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push(`/cart-items/${currentSlug}`);
  };
  console.log(currentSlug, "current");

  return (
    <div>
      <header>
        <div className="container">
          <nav className="navbar-custom">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-4 col-lg-4">
                  <a className="navbar-brand" href="/">
                    <Image
                      src="/images/logo.png"
                      alt="Logo"
                      className="logo-img"
                      width={132}
                      height={50}
                    />
                  </a>
                </div>
                <div className="col-8">
                  <div className="justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav justify-content-end">
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Contact
                        </a>
                      </li>
                      <li className="nav-item checkout-btn">
                        <a className="nav-link custom-btn" href="#">
                          Checkout
                        </a>
                      </li>
                      <li
                        className="nav-item signup-btn"
                        style={{ position: "relative" }}
                      >
                        <a
                          className="nav-link"
                          href="#"
                          onClick={handleCartButton}
                        >
                          <Image
                            src="/images/cart.svg"
                            alt="Cart"
                            width={40} // Specify the width of your SVG
                            height={25} // Specify the height of your SVG
                            style={{ position: "relative" }}
                          />
                          {/* Badge for showing the number of items */}
                          {cartItemsCount > 0 && (
                            <span className="cart-item-no">
                              {cartItemsCount}
                            </span>
                          )}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;
