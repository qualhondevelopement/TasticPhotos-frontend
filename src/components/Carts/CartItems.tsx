"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
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

interface CartItemsProps {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CartItems: React.FC<CartItemsProps> = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  // const [cartItems, setCartItems] = useState<any>(null);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  //redux
  const isloading = useSelector((state: any) => state.loading);
  const loading = useSelector((state: any) => state.loading);
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const cartItems = useSelector((state: any) => state.cart.cartData);

  const paymentId = currentSlug;

  const handlePayment = async () => {
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`;

    try {
      const response = await axios.get(paymentUrl);

      if (response.data && stripe) {
        const { sessionId } = response.data;
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error("Stripe Checkout error:", result.error.message);
          //  toast.error(result.error.message);
        }
      } else if (response.status !== 200) {
        console.error("Payment response error:", response.data.message);
        toast.error("Failed to create a payment session. Please try again.");
      }
    } catch (error: any) {
      console.error(
        "Payment failed:",
        error.response ? error.response.data.message : error.message
      );
      scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });

      toast.error(
        error.response ? error.response.data.message : error.message,
        {
          id: "payment ",
        }
      );
    }
  };
  const handleScroll = () => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleRemove = async () => {
    const { id: photoId } = cartItems;
    const qrId = currentSlug;
    console.log({
      qr_id: qrId,
      photo_id: photoId,
    });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`;

      const response = await axios.patch(apiUrl, {
        qr_id: qrId,
        photo_id: photoId,
        operation: "remove",
      });

      console.log(response.data.data, "remove response");
      dispatch(response.data.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <>
      <div>
        {!loading &&
        cartItems &&
        cartItems.photos &&
        cartItems.photos.length > 0 ? (
          <div>
            <section className="cart-banner">
              <h3 className="text-white ">Shopping Cart</h3>
            </section>
            <section className="cart-items-sec">
              <div className="container">
                <>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="cart-container">
                        <h4>Cart Items</h4>
                        <div className="row ">
                          {cartItems.photos.map((item: any) => (
                            <div key={item.id} className="col-lg-3 col-sm-6 ">
                              <div className="cart-images-outer">
                                <img
                                  className="img-fluid rounded"
                                  src={
                                    item.photo_thumbnail_url ||
                                    "/images/img-1.webp"
                                  }
                                  alt={item.description}
                                />
                                <div className="input12">
                                  <input
                                    type="checkbox"
                                    // onClick={handleRemove}
                                    onClick={() => setModalShow(true)}
                                  />
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <DeleteConfirmation
                          show={modalShow}
                          handleClose={() => setModalShow(false)}
                          handleDelete={handleRemove}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card  rounded p-3 summary-cart">
                        <h4 className="mb-3">Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                          <div>ITEMS</div>
                          <div>{cartItems?.photos?.length}</div>
                        </div>
                        <div className="d-flex justify-content-between border-top pt-3">
                          <div>TOTAL PRICE</div>
                          <div>
                            {cartItems.amount === 0
                              ? "NA"
                              : `$${cartItems.amount}`}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <a
                            className="custom-btn  d-flex align-items-center w-100 justify-content-center"
                            onClick={handlePayment}
                          >
                            CHECKOUT
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </section>
            {cartItems.amount === 0 && (
              <div className="container mb-5 " ref={scrollTargetRef}>
                <Plans handleScroll={handleScroll} />
              </div>
            )}
          </div>
        ) : (
          !loading && <EmptyCart />
        )}
      </div>
    </>
  );
};

const StripeCart = () => (
  <Elements stripe={stripePromise}>
    <CartItems />
  </Elements>
);

export default StripeCart;
