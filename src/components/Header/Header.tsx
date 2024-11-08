"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import useFetchData from "@/custom-hook/useFetchData";
import API_URLS from "@/customs/constant";
import { setToggleGallery } from "@/redux/toggleGallerySlice";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const galleryToggle = useSelector(
    (state: any) => state.toggleGallery.toggleGallery
  );

  const newLoading = useSelector((state: any) => state.loading);
  const cartItemsCount = useSelector(
    (state: any) => state.cart.cartData?.photos?.length
  );

  const { data, error, loading } = useFetchData(
    API_URLS.GET_GALLARY(currentSlug),
    "GET"
  );

  useEffect(() => {
    if (currentSlug) {
      // setToggleButton("GALLERY");
      dispatch(setToggleGallery("GALLERY"));
    } else {
    }
  }, [currentSlug]);

  const handleCartButton = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (error) {
    }
    router.push(`/cart-items/${currentSlug}`);
  };

  const handleGallery = () => {
    router.push(`/${currentSlug}`);
  };

  const handleMyPhoto = () => {
    if (window.location.pathname === "/") {
      document.getElementById("target-section")?.scrollIntoView();
    } else {
      window.location.href = "/#target-section";
    }
  };

  return (
    <header>
      <div className="container position-sticky">
        <nav className="navbar-custom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-4 col-lg-4">
                <a className="navbar-brand" onClick={() => router.push(`/`)}>
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
                    <li className="nav-item myphoto-btn">
                      <a
                        className="nav-link"
                        onClick={
                          galleryToggle === "MY PHOTO"
                            ? handleMyPhoto
                            : handleGallery
                        }
                      >
                        {galleryToggle}
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        className="nav-link"
                        onClick={() => router.push(`/contact`)}
                      >
                        Contact
                      </a>
                    </li>

                    <li className="nav-item checkout-btn">
                      <a
                        className="nav-link custom-btn"
                        onClick={() => {
                          if (error) {
                            router.push(`/cart`);
                          } else {
                            router.push(`/cart-items/${currentSlug}`);
                          }
                        }}
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
                        onClick={(e) =>
                          error ? router.push(`/cart`) : handleCartButton(e)
                        }
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
