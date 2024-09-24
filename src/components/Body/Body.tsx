"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageType/ImageCard";
import Plans from "./plans/Plans";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSlug } from "@/redux/slugSlice";

interface BodyProps {
}
const Body: React.FC<BodyProps> = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query; // Grab the slug from the URL

  useEffect(() => {
    if (id) {
      dispatch(setSlug(id)); 
    }
  }, [id, dispatch]);

  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [locationName, setLocationName] = useState<any>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const [cartData, setCartData] = useState<any[]>([]);

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
      console.error("Error fetching location data:", err);
    }
  };

  useEffect(() => {
    locationData();
       cartItemData();

  }, []);

  const cartItemData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=qwerty_12345601`
      );
      ///console.log(response.data.data.photos);
      setCartData(response.data.data.photos);
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  };

  const handleSelectImage = (id: string, isChecked: boolean) => {
    setSelectedImages((prev) =>
      isChecked ? [...prev, id] : prev.filter((imageId) => imageId !== id)
    );
  };

  // Select or Deselect all images
  const handleSelectAll = (isChecked: boolean) => {
    //  if (isChecked) {
    //    const allImageIds = locationName.flatMap((location: { data: any[]; }) =>
    //      location.data.map((image: any) => image.id)
    //    );
    //    setSelectedImages(allImageIds);
    //  } else {
    //    setSelectedImages([]);
    //  }
  };

 const handleAddCart = () => {
   if (selectedImages.length > 0) {
     console.log("Selected Images:", selectedImages);

     if (cartData.length === 0) {
       console.log("No items in cart");
      
     } else {
       console.log("Cart contains items");
        axios
          .put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`, {
            qr_id: "qwerty_12345601",
            photos: selectedImages, 
          })
          .then((response) => {
            console.log("Cart updated successfully", response.data);
          })
          .catch((error) => {
            console.error("Error updating cart", error);
          });
     }
   } else {
     console.log("No images selected");
   }
 };

  console.log(cartData);

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
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    checked={
                      selectedImages.length ===
                      locationName.flatMap((loc: { data: any }) => loc.data)
                        .length
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
                  <a  className="custom-btn" onClick={handleAddCart}>
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
