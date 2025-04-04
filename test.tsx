"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard/ImageCard";
import Plans from "./Plans/Plans";
import axios from "axios";
import useSWR from "swr";
import { setCartData } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BodyProps {}

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

const Body: React.FC<BodyProps> = () => {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const id = useSelector((state: any) => state.slug.currentSlug);
  const allCartData = useSelector((state: any) => state.cart.cartData);

  const { data: locationName, error } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-gallery/?qr_id=${id}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const isLoading = !locationName && !error;

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

  const handleSelectImage = (imageId: string, isChecked: boolean) => {
    setSelectedImages((prev) =>
      isChecked ? [...prev, imageId] : prev.filter((id) => id !== imageId)
    );
  };

  const handleSelectAll = (isChecked: boolean) => {
    const allIds =
      locationName?.flatMap((loc: any) => Object.keys(loc.data)) || [];
    setSelectedImages(isChecked ? allIds : []);
    if (isChecked) toast.success("All images selected");
  };

  const handleAddCart = async () => {
    if (!selectedImages.length) {
      toast.error("Select images first");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`,
        { qr_id: id, photos: selectedImages }
      );
      dispatch(setCartData(data.data));
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div>
      <section className="locations-sec">
        <div className="container">
          <Plans
            handleScroll={() => scrollTargetRef.current?.scrollIntoView()}
          />
          <hr className="line-grey" />

          <div className="row" ref={scrollTargetRef}>
            {isLoading ? (
              <h4 className="text-center text-muted">Loading images...</h4>
            ) : locationName?.length ? (
              <>
                <div className="col-md-12">
                  <div className="cart-btn-outer mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={
                            selectedImages.length ===
                            locationName.flatMap((loc: any) =>
                              Object.keys(loc.data)
                            ).length
                          }
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        <label className="form-check-label">
                          Select all ({selectedImages.length} selected)
                        </label>
                      </div>
                      <button className="custom-btn" onClick={handleAddCart}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>

                {locationName.map((location: any, index: number) => (
                  <React.Fragment key={location.name}>
                    <ImageCard
                      title={location.name}
                      data={location.data}
                      selectedImages={selectedImages}
                      onSelectImage={handleSelectImage}
                    />
                    {index < locationName.length - 1 && (
                      <hr className="line-grey" />
                    )}
                  </React.Fragment>
                ))}

                <div className="col-md-12 mt-4">
                  <button className="custom-btn w-100" onClick={handleAddCart}>
                    Add to cart ({selectedImages.length} selected)
                  </button>
                </div>
              </>
            ) : (
              <h4 className="text-center text-muted">
                No images available in QR
              </h4>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Body;
