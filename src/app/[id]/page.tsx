"use client";

import Banner from "@/components/Banner/Banner";
import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";
import { useParams } from "next/navigation";


export default function Page() {

  return (
    <div>
      <Header  />
      <Banner />
      <Body  /> 
    </div>
  );
}
