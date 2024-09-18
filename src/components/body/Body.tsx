"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./imageType/ImageCard";
import Plans from "./plans/Plans";
import axios from "axios";

interface BodyProps {
  slug: any;
}
const Body: React.FC<BodyProps> = ({ slug }) => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const [locationName, setLocationName] = useState<any>([]);

  const handleScroll = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const locationData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${slug}`
      );
      setLocationName(response.data.data);
    } catch (err) {
      console.log("not fetcghhed");
    }
  };
  useEffect(() => {
    locationData();
  }, []);

  console.log(
    locationName.map((data: any) => {
      return data; // Explicitly return the name field
    })
  );

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
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  >
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
            {locationName?.map((locationData: any, index: any) => (
              <ImageCard
                key={index}
                title={locationData.name}
                data={locationData.data}
              />
            ))}

            {/* <hr className="line-grey" />
            <ImageCard title={"Dolphin Exhibit"} />

            <hr className="line-grey" />
            <ImageCard title={"Chimpanzee Exhibit"} /> */}

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
