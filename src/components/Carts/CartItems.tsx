"use client";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import "./cartItem.css";
import { setLoading } from "@/redux/loadingSlice";
import toast from "react-hot-toast";
import { setCartData } from "@/redux/cartSlice";
import Plans from "../Body/Plans/Plans";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlansModal from "../Body/Plans/PlansModal";
import { FcInfo } from "react-icons/fc";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CartItems: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [planModalShow, setPlanModalShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Redux state
  const loading = useSelector((state: any) => state.loading);
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const cartItems = useSelector((state: any) => state.cart.cartData);

  const paymentId = currentSlug;

  const handlePayment = async () => {
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`;

    try {
      const { data } = await axios.get(paymentUrl);
      if (data && stripe) {
        const { sessionId } = data;
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error("Stripe Checkout error:", result.error.message);
        }
      } else {
        throw new Error(
          "Failed to create a payment session. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Payment failed:", error.message);
      scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
      toast.error(error.response?.data?.message || error.message, {
        id: "gh",
      });
    }
  };

  const handleRemove = async () => {
    const { id: photoId } = cartItems;
    const qrId = currentSlug;

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`;
      const response = await axios.patch(apiUrl, {
        qr_id: qrId,
        photo_id: photoId,
        operation: "remove",
      });
      toast.success("cart updated successfully");

      dispatch(response.data.data);
      setModalShow(false);
    } catch (error: any) {
      console.error("Error removing item from cart:", error);
      setModalShow(false);
    }
  };

  return (
    <div>
      {!loading && cartItems?.photos?.length ? (
        <>
          <section className="cart-banner">
            <h3 className="text-white">Shopping Cart</h3>
          </section>
          <section className="cart-items-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="cart-container">
                    <h4>Cart Items</h4>
                    <div className="row">
                      {cartItems.photos.map((item: any) => (
                        <div key={item.id} className="col-lg-3 col-sm-6">
                          <div className="cart-images-outer">
                            <Image
                              className="img-fluid rounded"
                              src={
                                item.photo_thumbnail_url || "/images/img-1.webp"
                              }
                              alt="Thumbnail"
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <div className="input12">
                              <input
                                type="checkbox"
                                onClick={() => setModalShow(true)}
                              />
                              <span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Add a plus button for adding more images */}
                      <div className="col-lg-3 col-sm-6">
                        <div
                          className="custom-add-button"
                          onClick={() => router.push(`/${currentSlug}`)}
                        >
                          <span className="display-4 text-muted">+</span>
                        </div>
                      </div>
                    </div>
                    <DeleteConfirmation
                      show={modalShow}
                      handleClose={() => setModalShow(false)}
                      handleDelete={handleRemove}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card rounded p-3 summary-cart">
                    <div className="d-flex justify-content-between">
                      <h4 className="mb-3 ">Summary</h4>
                      <>
                        {" "}
                        <button
                          className="btn p-0 plan-button"
                          onClick={() => setPlanModalShow(true)}
                        >
                          <FcInfo />
                          View Plans
                        </button>
                        <PlansModal
                          show={planModalShow}
                          handleClose={() => setPlanModalShow(false)}
                          handleModalClick={() => setPlanModalShow(false)}
                        />
                      </>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <div>ITEMS</div>
                      <div>{cartItems?.photos?.length}</div>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-3">
                      <div>TOTAL PRICE</div>
                      <div>
                        {cartItems.amount === 0
                          ? "N/A"
                          : `$${cartItems.amount}`}
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                      <a
                        className="custom-btn d-flex align-items-center w-100 justify-content-center"
                        onClick={handlePayment}
                      >
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* {cartItems.amount === 0 && (
            <div className="container mb-5" ref={scrollTargetRef}>
              <Plans
                handleScroll={() =>
                  scrollTargetRef.current?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
              />
            </div>
          )} */}
        </>
      ) : (
        !loading && <EmptyCart />
      )}
    </div>
  );
};

const StripeCart = () => (
  <Elements stripe={stripePromise}>
    <CartItems />
  </Elements>
);

export default StripeCart;
