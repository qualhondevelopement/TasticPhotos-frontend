"use client";

import { useRef, useCallback } from "react";
import HomeBanner from "@/components/Banner/HomeBanner";
import DefaultHome from "@/components/Body/Home/DefaultHome";
import Banner from "@/components/Banner/Banner";
import Plans from "@/components/Body/Plans/Plans";

export default function Home() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="">
      <Banner />
      <div className="locations-sec">
        <div className="container ">
          <Plans handleScroll={handleScroll} />
        </div>
        <div className="find-photo-section">
          <HomeBanner />
        </div>

        <div ref={scrollTargetRef}>
          <DefaultHome />
        </div>
      </div>
    </div>
  );
}
