"use client";

import Banner from "@/components/Banner/Banner";
import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";
import { setCartData } from "@/redux/cartSlice";
import { setSlug } from "@/redux/slugSlice";
import axios from "axios";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  // Extracting the slug from the pathname
  const id = pathname.split("/").pop();
  useEffect(() => {
    if (id) {
      dispatch(setSlug(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    cartItemData();
  }, [id, dispatch]);

  const cartItemData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=${id}`
      );
      dispatch(setCartData(response.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Banner />
      <Body />
    </div>
  );
}
