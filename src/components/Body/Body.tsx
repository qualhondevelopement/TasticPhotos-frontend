"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageType/ImageCard";
import Plans from "./plans/Plans";
import axios from "axios";
import { setCartData } from "@/redux/cartSlice";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

interface BodyProps {}
const Body: React.FC<BodyProps> = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [locationName, setLocationName] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const id = useSelector((state: any) => state.slug.currentSlug);

  const allCartData = useSelector((state: any) => state.cart.cartData);

  const dispatch = useDispatch();

  const handleScroll = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const locationData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${id}`
      );
      setLocationName(response.data.data);
    } catch (err) {
      console.error("Error fetching location data:", err);
    }
  };

    useEffect(() => {
      if (allCartData?.photos) {
        const imageIds = allCartData.photos.map((photo: any) => photo.photo_id);
        setSelectedImages(imageIds);
      }
    }, [allCartData]);


  useEffect(() => {
    if (id) {
      locationData();
    }
  }, [id, selectedImages]);

  const handleSelectImage = (imageId: string, isChecked: boolean) => {
    setSelectedImages((prev) =>
      isChecked ? [...prev, imageId] : prev.filter((id) => id !== imageId)
    );
  };

  // Select or Deselect all images
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      const allImageIds = locationName.flatMap((loc: { data: any }) => {
        return Object.keys(loc.data);
      });
      console.log(allImageIds);
      setSelectedImages(allImageIds);
      toast.success("All Images Selected");
    } else {
      setSelectedImages([]);
    }
  };

  const handleAddCart = () => {
    if (selectedImages.length > 0) {
      console.log("Selected Images:", selectedImages);

      if (allCartData?.photos?.length === 0) {
        console.log("No items in cart");
      } else {
        axios
          .put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`, {
            qr_id: id,
            photos: selectedImages,
          })
          .then((response) => {
            dispatch(setCartData(response.data.data));

            console.log("Cart updated successfully", response.data);

            toast.success("Cart updated successfully");
          })
          .catch((error) => {
            console.error("Error updating cart", error);
            toast.error("Error updating cart");
          });
      }
    } else {
      console.log("No images selected");
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
                  <a className="custom-btn" onClick={handleAddCart}>
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
            {locationName?.map((locationData: any, index: any) => (
              <React.Fragment key={index}>
                <ImageCard
                  title={locationData.name}
                  data={locationData.data}
                  onSelectImage={handleSelectImage}
                  selectedImages={selectedImages}
                />
                <hr className="line-grey" />
              </React.Fragment>
            ))}
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
