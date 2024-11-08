"use client";
import Header from "@/components/Header/Header";
import Loader from "@/components/utils/loader/Loader";
import { useEffect } from "react";

import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isloading = useSelector((state: any) => state.loading);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  console.log(isloading);
  return (
    <div>
      {/* {!isloading && <Loader />} */}
      <Header />

      {children}
    </div>
  );
}
