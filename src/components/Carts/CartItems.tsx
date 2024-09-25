import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import Header from "../Header/Header";
import CartSvg from "../Payment/CartSvg";
import EmptyCart from "./EmptyCart";

interface CartItemsProps {}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CartItems: React.FC<CartItemsProps> = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any>({});
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const cartData = useSelector((state: any) => state.cart.cartData);

  const stripe = useStripe();
  const paymentId = currentSlug;

  useEffect(() => {
    if (cartData && cartData.photos) {
      console.log("cartdata",cartData)
      setCartItems(cartData);
    } else {
      setCartItems({ photos: [], amount: 0 });
    }
  }, [cartData]);

  const handlePayment = async () => {
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`;

    try {
      const response = await axios.get(paymentUrl);
      if (response.data && stripe) {
        const { sessionId } = response.data;
        const result = await stripe.redirectToCheckout({ sessionId });
        if (result.error) {
          console.error("Stripe Checkout error", result.error.message);
        }
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        {cartItems?.photos?.length > 0 ? (
          <>
            <div
              style={{
                backgroundColor: "#3d9be9",
                maxWidth: "100%",
                height: "8rem", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
                marginBottom: "20px",
              }}
            >
              <h2 className="text-white mb-0">Shopping Cart</h2>
            </div>
            <div className="row">
              <div className="col-md-8">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="table table-hover">
                      <h5>Image</h5>
                      <div className="d-flex flex-wrap justify-content-start">
                        {cartItems.photos.map((item: any) => (
                          <div
                            key={item.id}
                            className="card m-2"
                            style={{ width: "150px" }}
                          >
                            <img
                              className="img-fluid rounded"
                              src={
                                item.photo_thumbnail_url || "/images/img-1.webp"
                              }
                              alt={item.description}
                              style={{ width: "100%", height: "auto" }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light rounded p-4">
                  <h5 className="mb-3">
                    <b>Summary</b>
                  </h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <div>ITEMS</div>
                    <div>{cartItems?.photos?.length}</div>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2">
                    <div>TOTAL PRICE</div>
                    <div>{cartItems?.amount}</div>
                  </div>
                  <button
                    className="btn btn-primary btn-block mt-3"
                    onClick={handlePayment}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
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
