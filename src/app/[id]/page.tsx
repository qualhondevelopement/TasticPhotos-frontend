"use client";

import { useParams } from "next/navigation";
import Banner from "@/components/banner/Banner";
import Body from "@/components/body/Body";
import Header from "@/components/header/Header";

export default function Page() {
  const { id } = useParams(); 

  return (
    <div>
      <Header />
      <Banner />
      <Body slug={id} /> 
    </div>
  );
}
