"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../utils/loader/Loader";

const Banner = () => {
  const [bannerImage, setBannerImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await axios.get<{ url: string }>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-banner-image/`
        );
        setBannerImage(response.data.url);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImage();
  }, []);

  return (
    <section className="banner-sec">
      {bannerImage ? (
        <img src={bannerImage} alt="Banner" className="w-100" />
      ) : (
        <div className="banner-sec w-100">
          <Loader />
        </div>
      )}
    </section>
  );
};

export default Banner;
