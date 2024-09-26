"use client";

import Banner from "@/components/Banner/Banner";
import Body from "@/components/Body/Body";
import useCartItem from "@/custom-hook/useCartItem";
import { setCartData } from "@/redux/cartSlice";
import { setSlug } from "@/redux/slugSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const { cartData, slug } = useCartItem();

  useEffect(() => {
    if (slug) {
      dispatch(setSlug(slug));
    }
    if (cartData) {
      dispatch(setCartData(cartData));
    }
  }, [slug, cartData, dispatch]);
  return (
    <div>
      <Banner />
      <Body />
    </div>
  );
}
