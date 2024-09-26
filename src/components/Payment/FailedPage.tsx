// pages/payment-success.js
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const FailedPage = () => {
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
              className="feather feather-x-circle"
              width="100"
              height="100"
              style={{ color: "red" }}
            >
              <path d="M15 9L9 15" /> {/* Corrected path for smaller cross */}
              <path d="M9 9l6 6" /> {/* Corrected path for smaller cross */}
              <circle cx="12" cy="12" r="10" />
            </svg>

            <h4 className="mt-4 mb-4">Payment Failed</h4>
            <p className="mb-4">
              Your payment could not be processed. Please try again.
            </p>
            <Button
              variant="success"
              className="btn custom-btn"
              onClick={() => router.push(`/cart-items/${id}`)}
            >
              Back To Cart
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FailedPage;
