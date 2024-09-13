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
