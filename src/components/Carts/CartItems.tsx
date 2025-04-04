"use client";
import axios from "axios";
import React, { useState } from "react";
// import { useStripe, Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import { useSelector, useDispatch } from "react-redux";
import EmptyCart from "./EmptyCart";
import "./cartItem.css";
import { setLoading } from "@/redux/loadingSlice";
import toast from "react-hot-toast";
import { setCartData } from "@/redux/cartSlice";
// import Plans from "../Body/Plans/Plans";
import DeleteConfirmation from "../Common/DeleteConfirmation";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import PlansModal from "../Body/Plans/PlansModal";
import { FcInfo } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import CustomerFormModel from "./CustomerFormModel";

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);
interface FormData {
  name: string;
  email: string;
}

const CartItems: React.FC = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState<boolean>(false);
  const [planModalShow, setPlanModalShow] = useState<boolean>(false);

  const dispatch = useDispatch();
  // const stripe = useStripe();
  const router = useRouter();
  // Redux state
  const loading = useSelector((state: any) => state.loading);
  const currentSlug = useSelector((state: any) => state.slug.currentSlug);
  const cartItems = useSelector((state: any) => state.cart.cartData);

  const paymentId = currentSlug;

  // const handlePayment = async () => {
  //   const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`;

  //   try {
  //     const { data } = await axios.get(paymentUrl);
  //     if (data && stripe) {
  //       const { sessionId } = data;
  //       const result = await stripe.redirectToCheckout({ sessionId });

  //       if (result.error) {
  //         console.error("Stripe Checkout error:", result.error.message);
  //       }
  //     } else {
  //       throw new Error(
  //         "Failed to create a payment session. Please try again."
  //       );
  //     }
  //   } catch (error: any) {
  //     console.error("Payment failed:", error.message);
  //     toast.error(error.response?.data?.message || error.message, {
  //       id: "gh",
  //     });
  //   }
  // };

  const handleRemove = async (photoId: string) => {
    const qrId = currentSlug;
    try {
      dispatch(setLoading(true));
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/`;
      const response = await axios.patch(apiUrl, {
        qr_id: qrId,
        photo_id: photoId,
        operation: "remove",
      });

      toast.success("Cart updated successfully");

      dispatch(setCartData(response.data.data));
      setModalShow(false);
    } catch (error: any) {
      console.error("Error removing item from cart:", error);
      setModalShow(false);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const openModal = (photoId: string) => {
    setSelectedPhotoId(photoId);
    setModalShow(true);
  };

  const handleGoBack = () => {
    router.push(`/${currentSlug}`);
  };

  const openPaymentFormModal = () => setIsPaymentFormOpen(!isPaymentFormOpen);
  const closePaymentFormModal = () => setIsPaymentFormOpen(false);

  const handleFormSubmit = async (data: FormData) => {
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/`;
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        paymentUrl,
        {
          qr_id: paymentId,
          email: data.email,
          name: data.name,
        },
        {
          timeout: 240000,
        }
      );

      const responseData = response.data;

      if (responseData && responseData.checkout_url) {
        console.log("Redirecting to:", responseData.checkout_url);
        router.push(responseData.checkout_url);
      } else {
        console.error("No checkout URL in response:", responseData);
        toast.error("Payment initialization failed: No checkout URL received");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error(error.response?.data?.message || error.message, {
        id: "gh",
      });
    } finally {
      dispatch(setLoading(false));
      setIsPaymentFormOpen(false);
    }
  };

  return (
    <div>
      {!loading && cartItems?.photos?.length ? (
        <div>
          <section className="cart-banner">
            <h3 className="text-white">Shopping Cart</h3>
          </section>
          <div className="back-btn mt-5" onClick={handleGoBack}>
            <div className="container">
              <a className="backbtn">
                <IoIosArrowBack size={20} className="back-button" />
                Back To Gallery
              </a>
            </div>
          </div>
          <section className="cart-items-sec">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <div className="cart-container">
                    <h4>Cart Items</h4>
                    <div className="row">
                      {cartItems.photos.map((item: any) => (
                        <div
                          key={item.id}
                          className="col-xl-3 col-lg-4 col-sm-6"
                        >
                          <div className="cart-images-outer">
                            <img
                              className="img-fluid rounded"
                              src={
                                item.photo_thumbnail_url || "/images/img-1.webp"
                              }
                              alt="Thumbnail"
                              // fill
                              style={{ objectFit: "cover" }}
                              // blurDataURL="/images/img-1.webp"
                              // placeholder="blur"
                            />
                            <div className="input12 cart-cross">
                              <input
                                type="checkbox"
                                onClick={() => openModal(item.photo_id)}
                              />
                              <span></span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* Add a plus button for adding more images */}
                      <div
                        className="col-xl-3 col-lg-4 col-sm-6"
                        onClick={() => router.push(`/${currentSlug}`)}
                      >
                        <div className="custom-add-button">
                          <span className="display-4 text-muted">+</span>
                        </div>
                      </div>
                    </div>
                    <DeleteConfirmation
                      show={modalShow}
                      handleClose={() => setModalShow(false)}
                      handleDelete={() =>
                        selectedPhotoId && handleRemove(selectedPhotoId)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card rounded p-3 summary-cart">
                    <div className="d-flex justify-content-between mb-3">
                      <h4 className="mb-0">Summary</h4>
                      <div>
                        {" "}
                        <span
                          className=" p-0 plan-button"
                          onClick={() => setPlanModalShow(true)}
                        >
                          <FcInfo />
                          View Plans
                        </span>
                        <PlansModal
                          show={planModalShow}
                          handleClose={() => setPlanModalShow(false)}
                          handleModalClick={() => setPlanModalShow(false)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mb-2 items-outer">
                      <div>ITEMS</div>
                      <div>{cartItems?.photos?.length}</div>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-3 items-outer">
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
                        onClick={openPaymentFormModal}
                      >
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </div>
                {isPaymentFormOpen && (
                  <CustomerFormModel
                    isOpen={isPaymentFormOpen}
                    onClose={closePaymentFormModal}
                    onSubmitSuccess={handleFormSubmit}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      ) : (
        !loading && <EmptyCart />
      )}
    </div>
  );
};

export default CartItems;

// const StripeCart = () => (
//   <Elements stripe={stripePromise}>
//     <CartItems />
//   </Elements>
// );

// export default StripeCart;
