import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../utils/loader/Loader";
import PaymentLoader from "./PaymentLoader";
import { FaDownload } from "react-icons/fa";

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

  const sessionId = searchParams.get("session_id");
  const hasCalledApi = useRef(false);
  const [loading, setLoading] = useState(true);
  const [zipUrl, setZipUrl] = useState<string | null>(null);

  useEffect(() => {
    const verifyPaymentAndDownload = async () => {
      if (sessionId && id && !hasCalledApi.current) {
        hasCalledApi.current = true;
        setLoading(true);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/download_zip/`,
            {
              session_id: sessionId,
              qr_id: id,
            }
          );
          // console.log(response.data);
          setZipUrl(response.data.zip_url);
        } catch (err: any) {
          console.log(err);
          toast.error(err.response.data.error);
        } finally {
          setLoading(false);
        }
      }
    };

    verifyPaymentAndDownload();
  }, [sessionId, id]);

  return (
    <section className="empty-cart-sec">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-12 col-12 text-center">
            {loading ? (
              <div className="loader">
                <PaymentLoader />
              </div>
            ) : zipUrl ? (
              <>
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
                </svg>
                <h4 className="mt-4 mb-4">Payment successful</h4>
                <p className="mb-4">
                  Your payment was processed successfully. Thank you!
                </p>
                <a
                  href={zipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="custom-btn"
                >
                  <FaDownload className="download-icon" />
                  Download Your File
                </a>
                <div className="btn-cart mt-3">
                  <a
                    className="custom-btn"
                    onClick={() => router.push(`/${id}`)}
                  >
                    Back To Home
                  </a>
                </div>
              </>
            ) : (
              <div className="btn-cart mt-3">
                <p>Something went wrong. Please try again.</p>

                <a className="custom-btn" onClick={() => router.push(`/${id}`)}>
                  Back To Home
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
