import React from "react";
import CartSvg from "../Payment/CartSvg";

const EmptyCart = () => {
  return (
    <div>
      {" "}
      <section className="py-9 py-lg-8 py-xxl-16">
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
          >
            <div className="col-lg-6 col-md-12 col-12 text-center mt-5">
              <CartSvg />
              <h2>Your shopping cart is empty</h2>
              <p className="mb-4">
                Return to the store to add items for your delivery slot. Before
                proceeding to checkout, you must add some products to your
                shopping cart. You will find a lot of interesting products on
                our shop page.
              </p>
              <a href="#" className="btn btn-primary">
                Explore Products
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmptyCart;
