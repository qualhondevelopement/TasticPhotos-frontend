"use client";
import Loader from "@/components/utils/loader/Loader";
import useCartItem from "@/custom-hook/useCartItem";
import usePreventActions from "@/custom-hook/useRestriction";
import { setCartData } from "@/redux/cartSlice";
import { setLoading } from "@/redux/loadingSlice";
import { setSlug } from "@/redux/slugSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isloading = useSelector((state: any) => state.loading);
  console.log(isloading, "load");
  const dispatch = useDispatch();
  const { cartData, slug } = useCartItem();

  useEffect(() => {
    if (slug) {
      dispatch(setSlug(slug));
    }
  }, [slug, isloading]);
  useEffect(() => {
    if (cartData) {
      dispatch(setCartData(cartData));
    }
  }, [cartData, isloading]);
  useEffect(() => {
    usePreventActions();
  }, []);
  return (
    <div>
      {isloading && <Loader />}
      {children}
    </div>
  );
}
