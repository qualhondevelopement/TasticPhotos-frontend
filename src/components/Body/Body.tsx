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
import { useRouter } from "next/navigation";

interface BodyProps {}

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const Body: React.FC<BodyProps> = () => {
  // const previousError = useRef<string | null>(null);
  // const loading = useSelector((state: any) => state.loading);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [allImageChecked, setAllImageChecked] = useState<boolean>(false);
  const id = useSelector((state: any) => state.slug.currentSlug);
  const allCartData = useSelector((state: any) => state.cart.cartData);
  // Use SWR to fetch location data
  const {
    data: locationName,
    error,
    isLoading,
  } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${id}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  // const isLoading = !locationName && !error;

  useEffect(() => {
    if (error) {
      router.push("/");
      toast.error("Invalid QR code", { id: "error-toast" });
    }
  }, [error, router]);

  useEffect(() => {
    if (allCartData?.photos) {
      setSelectedImages(allCartData.photos.map((photo: any) => photo.photo_id));
    }
  }, [allCartData]);

  useEffect(() => {
    if (allCartData?.photos) {
      const imageIds = allCartData.photos.map((photo: any) => photo.photo_id);
      setSelectedImages(imageIds);
      if (locationName) {
        const allImageIds = locationName.flatMap((loc: any) =>
          Object.keys(loc.data)
        );
        const isAllSelected =
          allImageIds.length > 0 &&
          allImageIds.every((id: any) => imageIds.includes(id));
        setAllImageChecked(isAllSelected);
      }
    }
  }, [allCartData]);

  const handleScroll = () => {
    scrollTargetRef.current?.scrollIntoView();
  };

  const handleSelectImage = (imageId: string, isChecked: boolean) => {
    const newSelectedImages = isChecked
      ? [...selectedImages, imageId]
      : selectedImages.filter((id) => id !== imageId);

    setSelectedImages(newSelectedImages);

    // Check if all images are now selected
    if (locationName) {
      const allImageIds = locationName.flatMap((loc: any) =>
        Object.keys(loc.data)
      );
      const isAllSelected =
        allImageIds.length > 0 &&
        allImageIds.every((id: any) => newSelectedImages.includes(id));
      setAllImageChecked(isAllSelected);
    }
  };

  // const handleSelectAll = (isChecked: boolean) => {
  //   if (isChecked) {
  //     const allImageIds = locationName.flatMap((loc: { data: any }) =>
  //       Object.keys(loc.data)
  //     );
  //     setSelectedImages(allImageIds);
  //     setAllImageChecked(true);
  //     toast.success("All Images Selected", {
  //       id: "4",
  //     });
  //   } else {
  //     setSelectedImages([]);
  //     setAllImageChecked(false);
  //   }
  // };

  const handleSelectAll = (isChecked: boolean) => {
    const allIds =
      locationName?.flatMap((loc: any) => Object.keys(loc.data)) || [];
    setSelectedImages(isChecked ? allIds : []);
    if (isChecked) {
      setAllImageChecked(true);
      toast.success("All images selected");
    } else {
      setSelectedImages([]);
      setAllImageChecked(false);
    }
  };

  const handleAddCart = async () => {
    if (!selectedImages.length) {
      toast.error("Select images first");
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
          const anotherResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/select-all-event/`,
            {
              select_all: allImageChecked,
              qr_id: id,
            }
          );
          dispatch(setCartData(anotherResponse.data.data));
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          response = await axios.put(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
            cartData
          );
          if (response.status === 200) {
            const anotherResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/select-all-event/`,
              {
                select_all: allImageChecked,
                qr_id: id,
              }
            );
            dispatch(setCartData(anotherResponse.data.data));
          }
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
            {isLoading ? (
              <h4 className="text-center text-muted">Loading images...</h4>
            ) : locationName &&
              locationName !== "undefined" &&
              locationName.length != 0 ? (
              <div className="col-md-12">
                <div className="cart-btn-outer mb-3">
                  {selectedImages.length > 0 && (
                    <div className="d-flex align-items-center p-2 select-img-outer">
                      <span className=" ">Selected Images:</span>
                      <span className="badge rounded-pill fs-6 text-black count-box">
                        <i> {selectedImages.length}</i>
                      </span>
                    </div>
                  )}

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
            ) : (
              <h4 className="text-center text-muted">
                No images available in QR.
              </h4>
            )}

            {!isLoading &&
              locationName?.map((locationData: any, index: any) => (
                <div>
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
                </div>
              ))}
            {locationName && locationName.length != 0 && (
              <div className="col-md-12">
                <div className="cart-btn-outer mb-3">
                  {selectedImages.length > 0 && (
                    <div className="d-flex align-items-center p-2 select-img-outer">
                      <span className=" ">Selected Images:</span>
                      <span className="badge rounded-pill fs-6 text-black count-box">
                        <i> {selectedImages.length}</i>
                      </span>
                    </div>
                  )}

                  <div className="btn-cart">
                    <a className="custom-btn" onClick={handleAddCart}>
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
