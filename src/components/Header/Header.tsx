"use client";

import React, { useEffect } from "react";
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
  const cartItemsCount = useSelector(
    (state: any) => state.cart.cartData?.photos.length
  );

  const handleCartButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.push(`/cart-items/${currentSlug}`);
  };

  return (
    <header>
      <div className="container position-sticky">
        <nav className="navbar-custom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-4 col-lg-4">
                <a
                  className="navbar-brand"
                  onClick={() => router.push(`/${currentSlug}`)}
                >
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
                      <a
                        className="nav-link"
                        onClick={() => router.push(`/contact/${currentSlug}`)}
                      >
                        Contact
                      </a>
                    </li>
                    <li className="nav-item checkout-btn">
                      <a
                        className="nav-link custom-btn"
                        onClick={() =>
                          router.push(`/cart-items/${currentSlug}`)
                        }
                      >
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
                          width={40}
                          height={25}
                          style={{ position: "relative" }}
                        />

                        {cartItemsCount > 0 && (
                          <span className="cart-item-no">
                            <i>{cartItemsCount}</i>
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
  );
};

export default Header;
