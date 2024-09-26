"use client";

import Banner from "@/components/Banner/Banner";
import Body from "@/components/Body/Body";
import useCartItem from "@/custom-hook/useCartItem";
import usePreventActions from "@/custom-hook/useRestriction";
import { setCartData } from "@/redux/cartSlice";
import { setSlug } from "@/redux/slugSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page() {

  return (
    <div>
      <Banner />
      <Body />
    </div>
  );
}
