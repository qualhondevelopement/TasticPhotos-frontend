import React from "react";
import CartSvg from "../Payment/CartSvg";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const EmptyCart = () => {
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
              <p className="mb-4">
                Return to the store to add items for your delivery slot. Before
                proceeding to checkout, you must add some products to your
                shopping cart. You will find a lot of interesting products on
                our shop page.
              </p>
              <a
                href="#"
                className="btn custom-btn"
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

export default EmptyCart;
