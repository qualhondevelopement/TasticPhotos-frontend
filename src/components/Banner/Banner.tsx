"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import useFetchData from "@/custom-hook/useFetchData";
import API_URLS from "@/customs/constant";
("@/customs/constant");
const Banner = () => {
  const [bannerImage, setBannerImage] = useState<string>("");

  const { data, error, loading } = useFetchData(API_URLS.GET_BANNER, "GET");

  useEffect(() => {
    if (data) {
      setBannerImage(data.url);
     // console.log(data.url, "url");
    }
  }, [data]);

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
