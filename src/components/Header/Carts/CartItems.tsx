import axios from "axios";
import React, { useEffect, useState } from "react";
import { useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
interface CartItemsProps {}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const CartItems: React.FC<CartItemsProps> = () => {
  const [cartItems, setCartItems] = useState<any>([]);
 
  useEffect(() => {
    cartItemData();
  }, []);

  const cartItemData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/manage-cart/?qr_id=qwerty_12345601`
      );
      ///console.log(response.data.data.photos);
      setCartItems(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(cartItems);
  const paymentId = "qwerty_12345601";
  const stripe = useStripe();

  const handlePayment = async () => {
    const paymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/payments/create-checkout-session/?qr_id=${paymentId}`;

    try {
      const response = await axios.get(paymentUrl);

      if (response.data && stripe) {
        return stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
      }
    } catch (error) {
      console.error("Payment failed", error);
    }
  };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="table table-hover">
                <h5>Image</h5>

                <div className="d-flex flex-wrap justify-content-start">
                  {cartItems?.photos?.map((item: any) => (
                    <div
                      key={item.id}
                      className="card m-2"
                      style={{ width: "150px" }}
                    >
                      <img
                        className="img-fluid rounded"
                        src={item.photo_thumbnail_url || "/images/img-1.webp"}
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
    </div>
  );
};
const Page = () => (
  <Elements stripe={stripePromise}>
    <CartItems />
  </Elements>
);

export default Page;
