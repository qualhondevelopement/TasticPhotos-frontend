"use client";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function NotFound() {
  const router = useRouter();
  const id = useSelector((state: any) => state.slug.currentSlug);
  return (
    <section className="empty-cart-sec">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-12 col-12 text-center">
            <div>
              <h1 className="not-found-heading">404</h1>
            </div>

            <h4 className="mt-4 mb-4">Page Not Found</h4>
            <p>
              Look like something's broken, It's not you its us.How about going
              back to the home page?
            </p>
            <a
              className=" custom-btn"
              onClick={() => router.push(`/${id}`)}
            >
              Back To Home{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
