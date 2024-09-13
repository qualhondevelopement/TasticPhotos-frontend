"use client";
import Banner from "@/components/banner/Banner";
import Body from "@/components/body/Body";
import Header from "@/components/header/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Body />
    </div>
  );
}
