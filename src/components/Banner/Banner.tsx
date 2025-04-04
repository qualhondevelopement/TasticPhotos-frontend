"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";
import useFetchData from "@/custom-hook/useFetchData";
import API_URLS from "@/customs/constant";
import Loader from "../utils/loader/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loadingSlice";
import Image from "next/image";
("@/customs/constant");
const Banner = () => {
  const [bannerImage, setBannerImage] = useState<string>("");
  const isloading = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const { data, error, loading } = useFetchData(API_URLS.GET_BANNER, "GET");

  useEffect(() => {
    if (loading) {
      dispatch(setLoading(loading));
    }
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
        // <Loader />
        <img
          src={bannerImage}
          alt="Banner"
          className="w-100"
          // style={{
          //   width: "100%",
          //   height: "auto",
          // }}
        />
      )}
    </section>
  );
};

export default Banner;
