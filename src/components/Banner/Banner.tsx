"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
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
      {loading ? (
        <div className="skeleton"></div>
      ) : (
        <img src={bannerImage} alt="Banner" className="w-100" />
      )}
    </section>
  );
};

export default Banner;
