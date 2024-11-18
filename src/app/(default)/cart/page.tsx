"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import CartSvg from "@/components/Payment/CartSvg";

const page = () => {
  const router = useRouter();
  const id = useSelector((state: any) => state.slug.currentSlug);

  return (
    <div>
      {" "}
      <section className="empty-cart-sec">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-12 col-12 text-center">
              <CartSvg />
              <h4 className="mt-4 mb-4">Your shopping cart is empty</h4>

              <a
                className="btn-cart custom-btn"
                onClick={() => router.push(`/${id}`)}
              >
                Home Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
