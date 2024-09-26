// pages/payment-success.js
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const PaymentSuccess = () => {
  const router = useRouter();
  const id = useSelector((state: any) => state.slug.currentSlug);

  return (
    <section className="empty-cart-sec">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-12 col-12 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-check-circle"
              width="100"
              height="100"
              style={{ color: "green" }}
            >
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>{" "}
            <h4 className="mt-4 mb-4">Payment successful</h4>
            <p className="mb-4">
              Your payment was processed successfully. Thank you!
            </p>
            <div className="btn-cart">
              <a className="  custom-btn" onClick={() => router.push(`/${id}`)}>
                Back To Cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
