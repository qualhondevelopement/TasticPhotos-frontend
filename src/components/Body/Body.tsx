"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard/ImageCard";
import Plans from "./Plans/Plans";
import axios from "axios";
import useSWR from "swr";
import { setCartData } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setLoading } from "@/redux/loadingSlice";

interface BodyProps {}

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const Body: React.FC<BodyProps> = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const previousError = useRef<string | null>(null);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [allImageChecked, setAllImageChecked] = useState<boolean>(false);
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.loading);
  const id = useSelector((state: any) => state.slug.currentSlug);
  const allCartData = useSelector((state: any) => state.cart.cartData);

  // Use SWR to fetch location data
  const { data: locationName, error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${id}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (error) {
      const errorMessage = error.response?.data?.message;

      // Only show toast if it's a new error message
      if (errorMessage && previousError.current !== errorMessage) {
        previousError.current = errorMessage;
        toast.error(errorMessage, {
          id: `gallery-error-${errorMessage}`,
        });
      }
    } else {
      // Reset previous error when there's no error
      previousError.current = null;
    }
  }, [error]);

  useEffect(() => {
    if (allCartData?.photos) {
      const imageIds = allCartData.photos.map((photo: any) => photo.photo_id);
      setSelectedImages(imageIds);
    }
  }, [allCartData]);

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
      setAllImageChecked(true);
      toast.success("All Images Selected", {
        id: "4",
      });
    } else {
      setSelectedImages([]);
      setAllImageChecked(false);
    }
  };

  const handleAddCart = async () => {
    if (selectedImages.length === 0) {
      toast.error("No images selected", {
        id: "3",
      });
      return;
    }

    try {
      const cartData = {
        qr_id: id,
        photos: selectedImages,
      };

      // Try post request first
      let response;
      try {
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
          cartData
        );
        if (response.status === 200) {
          dispatch(setCartData(response.data.data));

          axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/select-all-event/`,
            {
              select_all: allImageChecked,
              qr_id: id,
            }
          );
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
            cartData
          );
          dispatch(setCartData(response.data.data));
          axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/select-all-event/`,
            {
              select_all: allImageChecked,
              qr_id: id,
            }
          );
        } else {
          throw error;
        }
      }

      toast.success("Cart updated successfully", {
        id: "1",
      });
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart", {
        id: "2",
      });
    }
  };

  return (
    <div>
      <section className="locations-sec">
        <div className="container ">
          <Plans handleScroll={handleScroll} />
          <hr className="line-grey" />
          <div className="row" ref={scrollTargetRef}>
            {locationName && locationName !== "undefined" ? (
              <div className="col-md-12">
                <div className="cart-btn-outer mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      checked={
                        selectedImages.length ===
                        locationName?.flatMap((loc: { data: {} }) =>
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
                    <a className="custom-btn" onClick={handleAddCart}>
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            ) : null}

            {!loading &&
              locationName?.map((locationData: any, index: any) => (
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
                  {locationName && locationName !== "undefined" ? (
                    <a className="custom-btn" onClick={handleAddCart}>
                      Add to cart
                    </a>
                  ) : null}
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
