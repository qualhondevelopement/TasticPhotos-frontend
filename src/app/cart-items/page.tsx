"use client";

import { useParams } from "next/navigation";
import Banner from "@/components/Banner/Banner";
import Body from "@/components/Body/Body";
import Header from "@/components/Header/Header";
import CartItems from "@/components/Header/Carts/CartItems";

export default function Page() {
  const { id } = useParams();

  return (
    <div>
      <Header slug={id}/>
      <CartItems  />
    </div>
  );
}
