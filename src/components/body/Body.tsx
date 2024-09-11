"use client";

import React, { useRef } from "react";
import ImageCard from "./imageType/ImageCard";
import Plans from "./plans/Plans";

const Body = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <section className="locations-sec">
        <div className="container">
          <Plans handleScroll={handleScroll} />
          {/* <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="heading-fonts text-center">
                <h2>Our Plans</h2>
                <hr className="hr-line" />
                <p className="max-width-850 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="price-box text-center">
                <h4>All Photos Plan</h4>
                <h2 className="price-main">
                  <span>$</span> 99.99
                </h2>
                <p>
                  The All Photos Plan provides unlimited access to our vast library of
                  high-quality images. Download any photo for personal or commercial use
                  to enhance your creative projects effortlessly.
                </p>
                <a className="custom-btn buy-btn" onClick={handleScroll}>
                  Buy Now
                </a>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="price-box text-center">
                <h4>Individual Photo Plan</h4>
                <h2 className="price-main">
                  <span>$</span> 9.99
                </h2>
                <p>
                  With the Individual Photo Plan, you can buy any photo from our
                  collection. Choose from a diverse range of high-quality imagesto suit
                  your personal or commercial projects seamlessly.
                </p>
                <a className="custom-btn buy-btn" onClick={handleScroll}>
                  Buy Now
                </a>
              </div>
            </div>
          </div> */}
          <hr className="line-grey" />
          <div className="row">
            <div className="col-md-12" ref={scrollTargetRef}>
              <div className="cart-btn-outer mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                  />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Select all
                  </label>
                </div>
                <div className="btn-cart">
                  <a href="#" className="custom-btn">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>

            <ImageCard title={"Park Entrance"} />

            <hr className="line-grey" />
            <ImageCard title={"Dolphin Exhibit"} />

            <hr className="line-grey" />
            <ImageCard title={"Chimpanzee Exhibit"} />

            <div className="col-md-12">
              <div className="cart-btn-outer">
                <div className="btn-cart mt-2">
                  <a href="#" className="custom-btn">
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
