"use client";

import HomeBanner from "@/components/Banner/HomeBanner";
import DefaultHome from "@/components/Body/Home/DefaultHome";
import Banner from "@/components/Banner/Banner";
import Plans from "@/components/Body/Plans/Plans";
import Header from "@/components/Header/Header";
import { useSelector } from "react-redux";
import Loader from "@/components/utils/loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  restoreScrollPosition,
  saveScrollPosition,
} from "@/components/utils/scrollManagement";

export default function Home() {
  const handleScroll = () => {};
  const isloading = useSelector((state: any) => state.loading);
  const router = useRouter();

  return (
    <div>
      {isloading && <Loader />}
      <div>
        <Header />

        <Banner />
        <div className="locations-sec">
          <div className="container">
            <Plans handleScroll={handleScroll} />
          </div>
          <div className="find-photo-section">
            <HomeBanner />
          </div>

          <div>
            <DefaultHome />
          </div>
        </div>
      </div>
    </div>
  );
}
