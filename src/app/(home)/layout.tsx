"use client";
import Header from "@/components/Header/Header";
import Loader from "@/components/utils/loader/Loader";
import useCartItem from "@/custom-hook/useCartItem";
import { setSlug } from "@/redux/slugSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isloading = useSelector((state: any) => state.loading);
  const router = useRouter();
  const dispatch = useDispatch();
  const { slug } = useCartItem();

  useEffect(() => {
    if (slug == "null") {
      router.push(`/`);
    }
    if (slug) {
      dispatch(setSlug(slug));
    }
  }, [slug, isloading]);

  return (
    <div>
      {isloading && <Loader />}
      <Header />

      {children}
    </div>
  );
}
