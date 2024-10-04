"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import "./cartItem.css";
import { setLoading } from "@/redux/loadingSlice";
import toast from "react-hot-toast";

interface CartItemsProps {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CartItems: React.FC<CartItemsProps> = () => {
  // const [cartItems, setCartItems] = useState<any>(null);

  const dispatch = useDispatch();
  const stripe = useStripe();

  //redux
  const isloading = useSelector((state: any) => state.loading);
  const loading = useSelector((state: any) => state.loading);
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const cartItems = useSelector((state: any) => state.cart.cartData);

  const paymentId = currentSlug;

  // useEffect(() => {
  //   if (cartItems && cartItems.photos) {
  //     console.log("cartdata", cartItems);
  //   }
  //   console.log("cartitem", isloading);
  // }, [cartItems]);

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
      toast.error(
        error.response ? error.response.data.message : error.message,
        {
          id: "payment ",
        }
      );
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
                              </div>
                            </div>
                          ))}
                        </div>
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
                              : `$ ${cartItems.amount}`}
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mt-3">
                          <a className="custom-btn" onClick={handlePayment}>
                            CHECKOUT
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </section>
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
