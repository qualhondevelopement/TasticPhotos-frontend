"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard/ImageCard";
import Plans from "./plans/Plans";
import axios from "axios";
import { setCartData } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

interface BodyProps {}

const Body: React.FC<BodyProps> = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [locationName, setLocationName] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [allCartData, setAllCartData] = useState<any>(null);
  const dispatch = useDispatch();

  const id = useSelector((state: any) => state.slug.currentSlug);

  useEffect(() => {
    if (id) {
      fetchCartData();
      fetchLocationData();
    }
  }, [id]);

  useEffect(() => {
    if (allCartData?.photos) {
      const imageIds = allCartData.photos.map((photo: any) => photo.photo_id);
      setSelectedImages(imageIds);
    }
  }, [allCartData]);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=${id}`
      );
      setAllCartData(response.data.data);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const fetchLocationData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${id}`
      );
      setLocationName(response.data.data);
    } catch (err) {
      console.error("Error fetching location data:", err);
    }
  };

  const handleScroll = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectImage = (imageId: string, isChecked: boolean) => {
    setSelectedImages((prev) =>
      isChecked ? [...prev, imageId] : prev.filter((id) => id !== imageId)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allImageIds = locationName.flatMap((loc: { data: any }) =>
        Object.keys(loc.data)
      );
      setSelectedImages(allImageIds);
      toast.success("All Images Selected");
    } else {
      setSelectedImages([]);
    }
  };

  const handleAddCart = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected");
      return;
    }

    try {
      const cartData = {
        qr_id: id,
        photos: selectedImages,
      };

      // Try PUT request first
      let response;
      try {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
          cartData
        );
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
            cartData
          );
        } else {
          throw error;
        }
      }

      dispatch(setCartData(response.data.data));
      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  return (
    <div>
      <section className="locations-sec">
        <div className="container ">
          <Plans handleScroll={handleScroll} />
          <hr className="line-grey" />
          <div className="row">
            <div className="col-md-12" ref={scrollTargetRef}>
              <div className="cart-btn-outer mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedImages.length ===
                      locationName.flatMap((loc: { data: {} }) =>
                        Object.keys(loc.data)
                      ).length
                    }
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
                  <a className="custom-btn"  onClick={handleAddCart}>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>

            {locationName?.map((locationData: any, index: any) => (
              <>
                <ImageCard
                  key={index}
                  title={locationData.name}
                  data={locationData.data}
                  onSelectImage={handleSelectImage}
                  selectedImages={selectedImages}
                />
                {index < locationName.length - 1 && (
                  <hr className="line-grey" />
                )}
              </>
            ))}

            <div className="col-md-12">
              <div className="cart-btn-outer">
                <div className="btn-cart mt-2">
                  <a  className="custom-btn" onClick={handleAddCart}>
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
