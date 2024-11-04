"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import HomeBanner from "@/components/Banner/HomeBanner";
import DefaultHome from "@/components/Body/Home/DefaultHome";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/`);
  }, [router]);

  return (
    <>
      <HomeBanner />
      {/* <DefaultHome /> */}
    </>
  );
}
